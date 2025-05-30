import { useState, useEffect } from "react";
import Cards from "./cards";
import { useRouter } from "next/navigation";

const steps = [
	{
		questionNumber: 1,
		totalQuestions: 12,
		questionTitle: "Type of city",
		questionID: "type_of_city",
		options: [
			{ id: "rural", icon: "farm", label: "Rural" },
			{ id: "town", icon: "home", label: "Town" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 2,
		totalQuestions: 12,
		questionTitle: "Ideal climate",
		questionID: "ideal_climate",
		options: [
			{ id: "warm", icon: "wb_sunny", label: "Warm" },
			{ id: "mild", icon: "cloud", label: "Mild" },
			{ id: "cold", icon: "ac_unit", label: "Cold" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 3,
		totalQuestions: 12,
		questionTitle: "Family & education",
		questionID: "family_education",
		options: [
			{ id: "schools", icon: "school", label: "Schools and universities" },
			{ id: "parks", icon: "park", label: "Parks" },
			{ id: "kindergarten", icon: "child_care", label: "Kindergarten" },
		],
		isSingleSelect: false,
	},
	{
		questionNumber: 4,
		totalQuestions: 12,
		questionTitle: "Cost of living",
		questionID: "cost_of_living",
		options: [
			{ id: "low", icon: "savings", label: "Low" },
			{ id: "average", icon: "attach_money", label: "Average" },
			{ id: "high", icon: "account_balance", label: "High" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 5,
		totalQuestions: 12,
		questionTitle: "Safety & Security",
		questionID: "safety_security",
		options: [
			{ id: "not_important", icon: "local_police", label: "Not important" },
			{ id: "important", icon: "security", label: "Important" },
			{ id: "really_important", icon: "gpp_good", label: "Really important" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 6,
		totalQuestions: 12,
		questionTitle: "Transportation & Mobility",
		questionID: "transportation_mobility",
		options: [
			{
				id: "cycling_walking",
				icon: "directions_bike",
				label: "Cycling/walking",
			},
			{
				id: "public_transport",
				icon: "directions_bus",
				label: "Public transport",
			},
			{ id: "car", icon: "directions_car", label: "Car" },
		],
		isSingleSelect: false,
	},
	{
		questionNumber: 7,
		totalQuestions: 12,
		questionTitle: "Employment opportunity",
		questionID: "employment_opportunity",
		options: [
			{ id: "not_important", icon: "work_outline", label: "Not important" },
			{ id: "important", icon: "business_center", label: "Important" },
			{ id: "very_important", icon: "engineering", label: "Very important" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 8,
		totalQuestions: 12,
		questionTitle: "Nature & Environment",
		questionID: "nature_environment",
		options: [
			{ id: "near_lake", icon: "water", label: "Near lake" },
			{ id: "green_spaces", icon: "landscape", label: "Green spaces" },
			{ id: "near_sea", icon: "waves", label: "Near sea" },
		],
		isSingleSelect: false,
	},
	{
		questionNumber: 9,
		totalQuestions: 12,
		questionTitle: "Hubs & Accessibility",
		questionID: "hubs_accessibility",
		options: [
			{ id: "not_important", icon: "accessible", label: "Not important" },
			{ id: "train_station", icon: "train", label: "Train station" },
			{ id: "airport", icon: "flight", label: "Airport" },
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 10,
		totalQuestions: 12,
		questionTitle: "Social Life & Activities",
		questionID: "social_life_activities",
		options: [
			{ id: "nightlife", icon: "nightlife", label: "Nightlife/parties" },
			{ id: "cultural_life", icon: "theater_comedy", label: "Cultural life" },
			{ id: "outdoor_activities", icon: "hiking", label: "Outdoor activities" },
		],
		isSingleSelect: false,
	},
	{
		questionNumber: 11,
		totalQuestions: 12,
		questionTitle: "Medical Access",
		questionID: "medical_access",
		options: [
			{ id: "not_important", icon: "medical_services", label: "Not important" },
			{ id: "important", icon: "local_hospital", label: "Important" },
			{
				id: "very_important",
				icon: "health_and_safety",
				label: "Very important",
			},
		],
		isSingleSelect: true,
	},
	{
		questionNumber: 12,
		totalQuestions: 12,
		questionTitle: "Housing must be...",
		questionID: "housing",
		options: [
			{ id: "budget", icon: "house", label: "Budget" },
			{ id: "affordable", icon: "affordable_house", label: "Affordable" },
			{ id: "luxury", icon: "villa", label: "Luxury" },
		],
		isSingleSelect: true,
	},
];

export default function Questions() {
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const savedStep = localStorage.getItem("currentStep");
		if (savedStep) {
			setCurrentStep(parseInt(savedStep, 10));
		}
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		localStorage.setItem("currentStep", currentStep.toString());
	}, [currentStep]);

	const handleNext = async () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else if (currentStep === steps.length - 1) {
			await clearQuestions();
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const clearQuestions = async () => {
		//localStorage.removeItem("currentStep");
		//localStorage.removeItem("selectedOptions");
		setIsInitialized(true);
		setCurrentStep(0);

		setTimeout(() => {
			router.push("/summary/");
		}, 250);
	};

	const currentQuestion = steps[currentStep];


	return (
		<Cards
			questionNumber={currentQuestion.questionNumber}
			questionID={currentQuestion.questionID}
			totalQuestions={currentQuestion.totalQuestions}
			questionTitle={currentQuestion.questionTitle}
			options={currentQuestion.options}
			onNext={handleNext}
			onBack={handleBack}
			showBackButton={currentStep > 0}
			isSingleSelect={currentQuestion.isSingleSelect}
		/>
	);
}
