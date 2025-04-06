import {useEffect, useState} from 'react';
import {LinearProgress} from "@mui/material";
import './cards.css'
import PropTypes from "prop-types";

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import ParkIcon from '@mui/icons-material/Park';
import AndroidIcon from '@mui/icons-material/Android';
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SecurityIcon from '@mui/icons-material/Security';
import GppGoodIcon from '@mui/icons-material/GppGood';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WaterIcon from '@mui/icons-material/Water';
import ForestIcon from '@mui/icons-material/Forest';
import SailingIcon from '@mui/icons-material/Sailing';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HikingIcon from '@mui/icons-material/Hiking';
import HealingIcon from '@mui/icons-material/Healing';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CabinIcon from '@mui/icons-material/Cabin';
import VillaIcon from '@mui/icons-material/Villa';
import BungalowIcon from '@mui/icons-material/Bungalow';



const iconComponents = {
    home: HomeIcon,
    farm: ForestIcon,
    wb_sunny: WbSunnyIcon,
    cloud: CloudIcon,
    ac_unit: AcUnitIcon,
    school: SchoolIcon,
    park: ParkIcon,
    child_care: AndroidIcon,
    savings: SavingsIcon,
    attach_money: AttachMoneyIcon,
    account_balance: AccountBalanceIcon,
    local_police: LocalPoliceIcon,
    security: SecurityIcon,
    gpp_good: GppGoodIcon,
    directions_bike: DirectionsBikeIcon,
    directions_bus: DirectionsBusIcon,
    directions_car: DirectionsCarIcon,
    work_outline: WorkOutlineIcon,
    business_center: BusinessCenterIcon,
    engineering: EngineeringIcon,
    water: WaterIcon,
    landscape: ForestIcon,
    waves: SailingIcon,
    accessible: DirectionsWalkIcon,
    train: TrainIcon,
    flight: FlightIcon,
    nightlife: NightlifeIcon,
    theater_comedy: TheaterComedyIcon,
    hiking: HikingIcon,
    medical_services: HealingIcon,
    local_hospital: MedicationIcon,
    health_and_safety: HealthAndSafetyIcon,
    house: BungalowIcon,
    affordable_house: CabinIcon,
    villa: VillaIcon
};

// Dynamic icon component that renders the correct MUI icon based on name
const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconComponents[iconName];

    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in iconComponents mapping`);
        return null;
    }

    return <IconComponent {...props} />;
};

export default function Cards({
                                         questionNumber,
                                         questionID,
                                         totalQuestions,
                                         questionTitle,
                                         options,
                                         onNext = () => {},
                                         onBack = () => {},
                                         showBackButton,

                                     }) {



    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        const savedOptions = localStorage.getItem('selectedOptions');
        if (savedOptions) {
            setSelectedOptions(JSON.parse(savedOptions));
        }
    }, [])



    const handleSelect = (questionId, optionId) => {
        setSelectedOptions(prev => {
            const currentSelections = prev[questionId] || [];

            if (currentSelections.includes(optionId)) {
                return {
                    ...prev,
                    [questionId]: currentSelections.filter(id => id !== optionId),
                }
            } else {
                return {
                    ...prev,
                    [questionId]: [...currentSelections, optionId],
                }
            }
        })


    };

    const isOptionsSelected = (questionId, optionId) => {
        const s = selectedOptions[questionId] || [];
        return s.includes(optionId);
    }

    const hasSelections = (questionId) => {
        return (selectedOptions[questionId] || []).length > 0;
    }


    useEffect(() => {
        console.log(selectedOptions);
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    }, [selectedOptions]);



    const optionButtonStyle = (isSelected) => ({
        backgroundColor: '#353535',
        color: '#fff',
        width: '10vw', // will be changed
        height: '20vh', // will be changed
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#444444',
        },
        ...(isSelected && {
            border: '2px solid #ffffff',
        }),

        '@media (max-width: 800px)': {
            width: '60vw',
            height: '25vh',
        },

        '@media (max-width: 2048px)': {
            width: '15vw',
            height: '20vh',
        }
    });

    const navigationButtonStyle = (isDisabled = false) => ({
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '24px',
        padding: '8px 24px',
        '&:hover': {
            backgroundColor: '#e0e0e0',
        },
        ...(isDisabled && {
            opacity: 0.5,
            pointerEvents: 'none',
        }),
    });

    return (
        <div className="card-selector-container">
            <div className="card-content-wrapper">
                <div className="header-with-icon">
                    <HomeIcon sx={{ color: 'white' }} />
                    <span className="header-icon-text">Home</span>
                </div>

                <div className="question-container">
                    <div className="question-header">
                        <p className="question-progress-text">Question {questionNumber}/{totalQuestions}</p>
                        <h1 className="question-title">{questionTitle}</h1>
                        <LinearProgress
                            className="progress-bar"
                            color="primary"
                            variant={'determinate'}
                            value={questionNumber * 100 / totalQuestions}
                        />
                        {/*<p>{`${Math.round((questionNumber) * 100 / totalQuestions)}%`}</p>*/}
                    </div>

                    <div className="options-grid">
                        {options.map((option) => (
                            <Button
                                key={option.id}
                                variant="contained"
                                sx={optionButtonStyle(isOptionsSelected(questionID, option.id))}
                                onClick={() => handleSelect(questionID, option.id)}
                            >
                                <DynamicIcon
                                    iconName={option.icon}
                                    sx={{ fontSize: 40 }}
                                />
                                <span>{option.label}</span>
                            </Button>
                        ))}
                    </div>

                    <div className="navigation-buttons">
                        {showBackButton ? (
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIcon />}
                                sx={navigationButtonStyle()}
                                onClick={onBack}
                            >
                                Back
                            </Button>
                        ) : <div></div>}

                        <Button
                            variant="contained"
                            sx={navigationButtonStyle(!hasSelections(questionID))}
                            onClick={onNext}
                            disabled={!hasSelections(questionID)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Cards.propTypes = {
    questionNumber: PropTypes.string.isRequired,
    questionID: PropTypes.string.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    questionTitle: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    showBackButton: PropTypes.bool.isRequired,

}

