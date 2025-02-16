import type { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TabsContent } from "@/components/ui/tabs"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface MetaDataTabProps {
    control: Control<FormValues>
}

export function MetaDataTab({ control }: MetaDataTabProps) {
    return (
        <TabsContent value="meta">
            <Card>
                <CardHeader>
                    <CardTitle>Meta Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="URL" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="canonicalTag"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keywords</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter keywords separated by commas" 
                                        {...field} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card >
        </TabsContent >
    )
}

