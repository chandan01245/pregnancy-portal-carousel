
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { EmblaCarouselApi } from "embla-carousel-react";
import { useToast } from "@/components/ui/use-toast";
import BasicInfoStep from "./signup-steps/BasicInfoStep";
import HealthInfoStep from "./signup-steps/HealthInfoStep";
import PregnancyInfoStep from "./signup-steps/PregnancyInfoStep";
import DietaryInfoStep from "./signup-steps/DietaryInfoStep";
import ProgressIndicator from "./ProgressIndicator";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  height: z.number().min(100, { message: "Please enter a valid height in cm" }).max(250, { message: "Please enter a valid height in cm" }),
  weight: z.number().min(30, { message: "Please enter a valid weight in kg" }).max(200, { message: "Please enter a valid weight in kg" }),
  trimester: z.enum(["first", "second", "third"]),
  medicalConditions: z.array(z.string()).optional(),
  bmiBeforePregnancy: z.number().optional(),
  bmiDuringPregnancy: z.number().optional(),
  multiplePregnancies: z.enum(["no", "twins", "triplets", "more"]),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).max(60, { message: "Please enter a valid age" }),
  dietaryPreference: z.enum(["omnivore", "vegetarian", "vegan", "other"]),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselApi | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      height: 160,
      weight: 60,
      trimester: "first",
      medicalConditions: [],
      bmiBeforePregnancy: undefined,
      bmiDuringPregnancy: undefined,
      multiplePregnancies: "no",
      age: 30,
      dietaryPreference: "omnivore",
    },
  });

  const goToNextStep = async () => {
    // Validate current step fields based on the step
    let isValid = false;
    
    if (currentStep === 0) {
      isValid = await form.trigger(["name", "email", "password"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["height", "weight", "age"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["trimester", "multiplePregnancies", "medicalConditions"]);
    } else if (currentStep === 3) {
      isValid = await form.trigger(["dietaryPreference"]);
    }

    if (isValid) {
      if (currentStep < totalSteps - 1) {
        emblaApi?.scrollNext();
        setCurrentStep(currentStep + 1);
      } else {
        // Last step, submit the form
        form.handleSubmit(onSubmit)();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out all required fields correctly",
      });
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      emblaApi?.scrollPrev();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof SignupFormValues, value: any) => {
    form.setValue(field, value);
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="relative">
          <Carousel
            setApi={setEmblaApi}
            opts={{
              align: "start",
              loop: false,
              draggable: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="pt-1">
                <BasicInfoStep form={form} />
              </CarouselItem>
              <CarouselItem className="pt-1">
                <HealthInfoStep form={form} />
              </CarouselItem>
              <CarouselItem className="pt-1">
                <PregnancyInfoStep form={form} />
              </CarouselItem>
              <CarouselItem className="pt-1">
                <DietaryInfoStep form={form} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevStep}
            disabled={currentStep === 0}
            className="w-1/3"
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={goToNextStep}
            className="w-1/3 bg-pregnancy-primary hover:bg-pregnancy-secondary"
          >
            {currentStep === totalSteps - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
