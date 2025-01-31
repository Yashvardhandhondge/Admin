import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MetaTagsProps {
    data: {
        URL: string
        CanonicalTag: string
        Title: string
        Description: string
        Keywords: string
    }
    updateData: (data: Partial<MetaTagsProps["data"]>) => void
    onValidationChange: (isValid: boolean) => void
}

export default function MetaTags({ data, updateData, onValidationChange }: MetaTagsProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        updateData({ [name]: value })
    }

    useEffect(() => {
        const validate = () => {
            const newErrors: { [key: string]: string } = {}
            if (!data.Title) newErrors.Title = "Title is required."
            if (!data.Description) newErrors.Description = "Description is required."
            if (!data.Keywords) newErrors.Keywords = "Keywords are required."
            setErrors(newErrors)
            onValidationChange(Object.keys(newErrors).length === 0)
        }

        validate()
    }, [data, onValidationChange])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="URL">URL</Label>
                    <Input
                        id="URL"
                        name="URL"
                        placeholder="https://..."
                        value={data.URL}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="CanonicalTag">Canonical Tag</Label>
                    <Input
                        id="CanonicalTag"
                        name="CanonicalTag"
                        placeholder="https://www.example.com"
                        value={data.CanonicalTag}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Title">Title (60 characters)</Label>
                    <Textarea
                        id="Title"
                        name="Title"
                        value={data.Title}
                        onChange={handleChange}
                        maxLength={60}
                        rows={2}
                    />
                    {errors.Title && <div className="text-sm text-red-500">{errors.Title}</div>}
                    <div className="text-sm text-gray-500">{data?.Title?.length || 0} / 60</div>
                </div>


                <div className="space-y-2">
                    <Label htmlFor="Description">Description (165 characters)</Label>
                    <Textarea
                        id="Description"
                        name="Description"
                        value={data.Description}
                        onChange={handleChange}
                        maxLength={165}
                        rows={4}
                    />
                    {errors.Description && <div className="text-sm text-red-500">{errors.Description}</div>}
                    <div className="text-sm text-gray-500">{data?.Description?.length || 0} / 165</div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="Keywords">Keywords</Label>
                    <Textarea
                        id="Keywords"
                        name="Keywords"
                        placeholder="Enter keywords separated by commas"
                        value={data.Keywords}
                        onChange={handleChange}
                    />
                    {errors.Keywords && <div className="text-sm text-red-500">{errors.Keywords}</div>}
                </div>
            </CardContent>
        </Card>
    )
}
