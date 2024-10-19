"use client";
import FXForm from "@/components/form/FXForm";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { ArrowsUpFromLine, Cat, Ruler } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import jsPDF from "jspdf";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";

export default function GenerateOutliningNutrition() {
  const {user} = useUser(); 
  const [petDetail, setPetDetail] = useState<{type:string, age: number; weight: number }>(
    {} as { type: string, age: number; weight: number }
  );
  // const [feedingDetails, setFeedingDetails] = useState<{
  //   cups: string;
  //   calories: number;
  // }>({} as { cups: string; calories: number });
  const [petType, setPetType] = useState("");

  const generatePDF = (calories: number, cups: string) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const title = "Welcome To Our PurrfectCare";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Center the title
  doc.text(title, titleX, 20);

  // Table Column Address
  doc.setFontSize(12);
  const details = `${user?.name}, ${user?.email}`;
  const detailWidth = doc.getTextWidth(title); 
  const detailX = (doc.internal.pageSize.getWidth() - detailWidth) / 2; // Center the title
  doc.text(details, detailX, 25);

  doc.text("Recommended Daily Feeding Chart for Pets", 15, 38);

    // Table Column Headers
    doc.setFontSize(13);
    doc.text("Pet Type", 15, 45);
    doc.text("Age", 45, 45);
    doc.text("Weight (kg)", 90, 45);
    doc.text("Cups per Day", 135, 45);
    doc.text("Calories", 175, 45);

    // Pet data
    // const pets = [
    //   {
    //     name: "Cat",
    //     ageRange: "1-7 years",
    //     weight: 4,
    //     cups: "1/3 cup",
    //     calories: "200 calories",
    //   },
    //   {
    //     name: "Dog",
    //     ageRange: "1-6 years",
    //     weight: 10,
    //     cups: "1 cup",
    //     calories: "400 calories",
    //   },
    //   {
    //     name: "Rabbit",
    //     ageRange: "1-4 years",
    //     weight: 2,
    //     cups: "1/2 cup",
    //     calories: "150 calories",
    //   },
    //   {
    //     name: "Bird",
    //     ageRange: "1-3 years",
    //     weight: 0.1,
    //     cups: "1/4 cup",
    //     calories: "30 calories",
    //   },
    // ];

    // Set X-coordinates for alignment
    const petTypeX = 15;
    const ageRangeX = 45;
    const weightX = 90;
    const cupsX = 135;
    const caloriesX = 175;

    // Loop through the pets array and add the data to the table
    // pets.forEach((pet, index) => {
    //   const yPosition = 50 + index * 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text( petDetail.type, petTypeX, 52);
      doc.text( petDetail?.age.toString(), ageRangeX, 52);
      doc.text(petDetail?.weight.toString(), weightX, 52);
      doc.text( `${cups} Cups`, cupsX, 52);
      doc.text(`${calories.toString()} Calories`, caloriesX, 52);
    // });

    doc.setFontSize(10);
    const footerText = "The data in this chart provides general feeding guidelines for domestic pets."; 
    const footerWidth = doc.getTextWidth(footerText);
    const FooterX = (doc.internal.pageSize.getWidth() - footerWidth) / 2; // Center the title
    doc.text(footerText, FooterX, 70);
    doc.save("Pet_Nutrition_Needs.pdf");
  };

  const petData = {
    Cat: { baseWeight: 4, baseCups: 1 / 3, baseCalories: 200 },
    Dog: { baseWeight: 10, baseCups: 1, baseCalories: 400 },
    Rabbit: { baseWeight: 2, baseCups: 1 / 2, baseCalories: 150 },
    Bird: { baseWeight: 0.1, baseCups: 1 / 4, baseCalories: 30 },
  };

  function calculateDogFood(age: number, weight: number, caloriesPerCup = 400) {
    const rer = 70 * Math.pow(weight, 0.75);
    
    let multiplier = 1.8; 
    if (age < 1) {
      multiplier = 3; 
    } else if (age >= 7) {
      multiplier = 1.4; 
    }
    const mer = rer * multiplier;
    const cupsPerDay = mer / caloriesPerCup;
    
    // setFeedingDetails( {
    //   calories: Math.round(mer),
    //   cups: cupsPerDay.toFixed(2)
    // })
    const data = {
        calories: Math.round(mer),
        cups: cupsPerDay.toFixed(2)
      }
    generatePDF(data.calories, data.cups);
  }

  // const calculateFeeding = (petType: string, weight: number, age: number) => {
  //   const pet = petData[petType];
  //   if (!pet) return null;

  //   const weightFactor = weight / pet.baseWeight;
  //   const ageFactor = 1 + (age - pet.baseWeight) * 0.05; // Example: increase by 5% for each year

  //   const cups = pet.baseCups * weightFactor;
  //   const calories = pet.baseCalories * weightFactor * ageFactor;

  //   return { cups: cups.toFixed(2), calories: calories.toFixed(0) };
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("data", petDetail);
    if(petDetail.weight&&petDetail.age&&petDetail.weight){
      calculateDogFood( petDetail.age, petDetail.weight,);
    }
    else{
      toast.error('Please Select All Field')
    }
  };

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];

  return (
    <div className=" min-h-[300px] w-full p-5 rounded-md bg-default-100">
      <FXForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
          <div className="py-3">
          <span className="flex justify-start items-center gap-2">
              <Cat className="w-4" /> Pet's
            </span>
            <Select onChange={(e) => setPetDetail({ ...petDetail, type: e.target.value })} label="Select an animal" size="sm" className="max-w-xs border rounded-lg">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="py-3">
            <span className="flex justify-start items-center gap-2">
              <ArrowsUpFromLine className="w-4" /> Age
            </span>
            <Input
              type="number"
              name="age"
              variant="bordered"
              placeholder="Enter Pet's Age"
              // value={userDetail?.name}
              onChange={(e) =>
                setPetDetail({ ...petDetail, age: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="py-3">
            <span className="flex justify-start items-center gap-2">
              <Ruler className="w-4" /> Weight
            </span>
            <Input
              type="text"
              variant="bordered"
              placeholder="Enter Pet's Weight"
              // value={userDetail?.mobileNumber}
              onChange={(e) =>
                setPetDetail({
                  ...petDetail,
                  weight: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
        <Button
          className="my-3 w-full rounded-md bg-default-900 text-default"
          size="lg"
          type="submit"
        >
          Generate Nutrition Sheet
        </Button>
      </FXForm>
    </div>
  );
}
