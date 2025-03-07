
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PregnancyInfoStepProps {
  form: UseFormReturn<any>;
}

const medicalConditionOptions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "thyroid", label: "Thyroid Issues" },
  { id: "anemia", label: "Anemia" },
  { id: "asthma", label: "Asthma" },
  { id: "none", label: "None" },
];

const PregnancyInfoStep = ({ form }: PregnancyInfoStepProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium text-pregnancy-secondary mb-4">Pregnancy Information</h3>

      <FormField
        control={form.control}
        name="trimester"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Current Trimester</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="first" id="first" />
                  <Label htmlFor="first">First Trimester (1-12 weeks)</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="second" id="second" />
                  <Label htmlFor="second">Second Trimester (13-26 weeks)</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="third" id="third" />
                  <Label htmlFor="third">Third Trimester (27-40 weeks)</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="multiplePregnancies"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Pregnancy Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="single" />
                  <Label htmlFor="single">Single</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="twins" id="twins" />
                  <Label htmlFor="twins">Twins</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="triplets" id="triplets" />
                  <Label htmlFor="triplets">Triplets</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="more" id="more" />
                  <Label htmlFor="more">More</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medicalConditions"
        render={() => (
          <FormItem>
            <FormLabel>Medical Conditions (select all that apply)</FormLabel>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {medicalConditionOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              let updatedValue = [...(field.value || [])];
                              if (checked) {
                                updatedValue.push(option.id);
                              } else {
                                updatedValue = updatedValue.filter(
                                  (value) => value !== option.id
                                );
                              }
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PregnancyInfoStep;
