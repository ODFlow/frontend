"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Paper, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import './page.css'

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragOverlay, TouchSensor, MouseSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const questionTitles = {
    "type_of_city": "Type of city",
    "ideal_climate": "Ideal climate",
    "family_education": "Family & education",
    "cost_of_living": "Cost of living",
    "safety_security": "Safety & Security",
    "transportation_mobility": "Transportation & Mobility",
    "employment_opportunity": "Employment opportunity",
    "nature_environment": "Nature & Environment",
    "hubs_accessibility": "Hubs & Accessibility",
    "social_life_activities": "Social Life & Activities",
    "medical_access": "Medical Access",
    "housing": "Housing must be...",
};


const optionLabels = {
    "rural": "Rural",
    "town": "Town",
    "warm": "Warm",
    "mild": "Mild",
    "cold": "Cold",
    "schools": "Schools and universities",
    "parks": "Parks",
    "kindergarten": "Kindergarten",
    "low": "Low",
    "average": "Average",
    "high": "High",
    "not_important": "Not important",
    "important": "Important",
    "really_important": "Really important",
    "very_important": "Very important",
    "cycling_walking": "Cycling/walking",
    "public_transport": "Public transport",
    "car": "Car",
    "near_lake": "Near lake",
    "green_spaces": "Green spaces",
    "near_sea": "Near sea",
    "train_station": "Train station",
    "airport": "Airport",
    "nightlife": "Nightlife/parties",
    "cultural_life": "Cultural life",
    "outdoor_activities": "Outdoor activities",
    "budget": "Budget",
    "affordable": "Affordable",
    "luxury": "Luxury",
};


function SortableItem({ row }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: row.id.toString() });


    return (
        <div
            ref={setNodeRef}
            className={`preference-row ${isDragging ? 'preference-row-dragging' : ''}`}
            style={{
                transform: CSS.Transform.toString(transform),
                transition
            }}
            {...attributes}
            {...listeners}
        >
            <div className="row-content">
                <div className="priority-column">
                    <span className="priority-number">{row.order}</span>
                </div>
                <div className="category-column">
                    <span className="category-label">{row.questionTitle}</span>
                </div>
                <div className="selection-column">
                    <span className="selection-value">{row.optionLabel}</span>
                </div>
            </div>
            <div className="drag-handle">
                <DragIndicatorIcon />
            </div>
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [rowData, setRowData] = useState([]);
    const [activeId, setActiveId] = useState(null);

    // Configure sensors for drag and drop
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),

        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
            },
        }),

        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const savedOptions = localStorage.getItem("selectedOptions");
        if (savedOptions) {
            const parsedOptions = JSON.parse(savedOptions);
            setSelectedOptions(parsedOptions);

            const rows = transformOptionsToRows(parsedOptions);
            setRowData(rows);
        }
    }, []);


    const transformOptionsToRows = (options) => {
        let rowId = 0;
        const rows = [];

        Object.keys(options).forEach(questionId => {
            const selectedOptionValue = options[questionId];

            if (Array.isArray(selectedOptionValue)) {
                const optionLabelsText = selectedOptionValue
                    .map(id => optionLabels[id] || id)
                    .join(", ");

                rows.push({
                    id: rowId++,
                    questionId: questionId,
                    questionTitle: questionTitles[questionId] || questionId,
                    optionId: selectedOptionValue.join(','),
                    optionLabel: optionLabelsText,
                    order: rows.length + 1
                });
            }
        });

        return rows;
    };

    const saveReorderedPreferences = () => {
        const reorderedOptions = {};

        rowData.forEach(row => {
            if (!reorderedOptions[row.questionId]) {
                reorderedOptions[row.questionId] = [];
            }
            reorderedOptions[row.questionId].push(row.optionId);
        });

        localStorage.setItem("preferenceOrder", JSON.stringify(rowData.map(row => ({
            questionId: row.questionId,
            order: row.order
        }))
        ));

        localStorage.removeItem("currentStep");
        localStorage.removeItem("selectedOptions");
        router.push("/city/oulu");
    };

    const handleBack = () => {
        localStorage.removeItem("currentStep");
        localStorage.removeItem("selectedOptions");
        router.push("/");
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setRowData((items) => {
                const oldIndex = items.findIndex(item => item.id.toString() === active.id);
                const newIndex = items.findIndex(item => item.id.toString() === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                return newItems.map((row, index) => ({
                    ...row,
                    order: index + 1
                }));
            });
        }

        setActiveId(null);
    };

    const activeRow = activeId ? rowData.find(row => row.id.toString() === activeId.toString()) : null;

    return (
        <div className="preferences-container">
            <Paper className="preferences-paper">
                <Typography variant="h4" component="h1" className="preferences-title">
                    Your Preferences Summary
                </Typography>

                <Typography className="preferences-description">
                    Review your selections below. Drag and drop rows to prioritize your preferences.
                    Higher items in the list will have more weight in determining your ideal location.
                </Typography>

                <div className="table-container">
                    <div className="table-header">
                        <div className="priority-header">Priority</div>
                        <div className="category-header">Category</div>
                        <div className="selection-header">Your Selection</div>
                        <div className="handle-header"></div>
                    </div>

                    <div className="preferences-list">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={rowData.map(row => row.id.toString())}
                                strategy={verticalListSortingStrategy}
                            >
                                {rowData.map((row) => (
                                    <SortableItem key={row.id} row={row} />
                                ))}
                            </SortableContext>

                            <DragOverlay>
                                {activeRow ? (
                                    <div className="drag-overlay">
                                        <div className="row-content">
                                            <div className="priority-column">
                                                <span className="priority-number">{activeRow.order}</span>
                                            </div>
                                            <div className="category-column">
                                                <span className="category-label">{activeRow.questionTitle}</span>
                                            </div>
                                            <div className="selection-column">
                                                <span className="selection-value">{activeRow.optionLabel}</span>
                                            </div>
                                        </div>
                                        <div className="drag-handle">
                                            <DragIndicatorIcon />
                                        </div>
                                    </div>
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>

                <Box className="button-container">
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                        className="back-button"
                    >
                        Back to Questions
                    </Button>

                    <Button
                        variant="contained"
                        onClick={saveReorderedPreferences}
                        className="results-button"
                    >
                        See Results
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}