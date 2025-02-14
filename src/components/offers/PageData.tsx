import type { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabsContent } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface PageDataTabProps {
    control: Control<FormValues>
}


export function PageDataTab({ control }: PageDataTabProps) {
    return (
        <TabsContent value="page" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Page Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="banner"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Upload Banner</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <Button variant="secondary" type="button">
                                                <Upload className="w-4 h-4 mr-2" />
                                                File
                                            </Button>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                ref={ref}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="thumbnail"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <Button variant="secondary" type="button">
                                                <Upload className="w-4 h-4 mr-2" />
                                                File
                                            </Button>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                ref={ref}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={control}
                        name="offerType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Offer Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select offer type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="airline">Airline</SelectItem>
                                        <SelectItem value="holiday">Holiday</SelectItem>
                                        <SelectItem value="hotels">Hotels</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
        </TabsContent>
    )
}

