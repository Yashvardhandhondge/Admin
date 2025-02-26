import type { Control, UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabsContent } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"

interface PageDataTabProps {
    control: Control<FormValues>
    form: UseFormReturn<FormValues, any, undefined>
}

interface OfferType {
    OfferTypeId: number
    OfferTypeName: string
}

export function PageDataTab({ control, form }: PageDataTabProps) {
    const [offerTypes, setOfferTypes] = useState<OfferType[]>([])

    useEffect(() => {
        const fetchOfferTypes = async () => {
            try {
                const response = await fetch('https://api.nixtour.com/api/List/OfferTypeList')
                const data = await response.json()
                if (data.Success) {
                    setOfferTypes(data.Data)
                }
            } catch (error) {
                console.error('Error fetching offer types:', error)
            }
        }

        fetchOfferTypes()
    }, [])

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
                                                accept=".webp"
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
                                                accept=".webp"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                ref={ref}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="offerTypeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offer Type</FormLabel>
                                    <Select 
                                        onValueChange={(e)=>{
                                            form.setValue("offerTypeId", offerTypes.find(type => type.OfferTypeName === e)?.OfferTypeId || 0)
                                            field.onChange(e)
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue="" placeholder="Select offer type">
                                                    {offerTypes.find(type => type.OfferTypeName === field.value)?.OfferTypeName || "Select offer type"}
                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {offerTypes.map((type) => (
                                                <SelectItem 
                                                    key={type.OfferTypeId} 
                                                    value={type.OfferTypeName}
                                                >
                                                    {type.OfferTypeName} (ID: {type.OfferTypeId})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="offerTypeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offer Type ID</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            type="number"
                                            disabled
                                            placeholder="Enter Offer Type ID"
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

