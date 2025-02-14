import type { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { TabsContent } from "@/components/ui/tabs"
import { DatePicker } from "antd"
import moment from "moment"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface DatesTabProps {
    control: Control<FormValues>
}

export function DatesTab({ control }: DatesTabProps) {
    return (
        <TabsContent value="dates">
            <Card>
                <CardHeader>
                    <CardTitle>Offer Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="offerStartDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Offer Start Date</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value ? moment(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toDate() : null)}
                                            format="YYYY-MM-DD"
                                            picker="date"
                                            allowClear
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="offerEndDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Offer End Date</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value ? moment(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toDate() : null)}
                                            format="YYYY-MM-DD"
                                            picker="date"
                                            allowClear
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

