import type { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { TabsContent } from "@/components/ui/tabs"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface DetailsTabProps {
    control: Control<FormValues>
}

export function DetailsTab({ control }: DetailsTabProps) {
    return (
        <TabsContent value="details">
            <Card>
                <CardHeader>
                    <CardTitle>Offer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={control}
                        name="discountDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Discount Description" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="cancellationPolicy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cancellation Policy</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Cancellation Policy" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="termsAndCondition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Terms and Condition</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Terms and Condition" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
        </TabsContent>
    )
}

