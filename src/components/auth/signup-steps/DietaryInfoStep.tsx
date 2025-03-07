
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DietaryInfoStepProps {
  form: UseFormReturn<any>;
}

const DietaryInfoStep = ({ form }: DietaryInfoStepProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium text-pregnancy-secondary mb-4">Dietary Preferences</h3>

      <FormField
        control={form.control}
        name="dietaryPreference"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Dietary Preference</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="omnivore" id="omnivore" />
                  <Label htmlFor="omnivore">Non-vegetarian</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="py-4 my-4 text-center border border-pregnancy-soft-purple/50 rounded-md bg-pregnancy-soft-purple/10">
        <h4 className="font-medium text-pregnancy-secondary">Thank You!</h4>
        <p className="text-sm text-muted-foreground mt-1">
          This information helps us personalize your pregnancy journey
        </p>
      </div>
    </div>
  );
};

export default DietaryInfoStep;
