import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MetaTagsProps {
    data: {
        Url: string
        CanonicalTag: string
        Title: string
        Description: string
        Keywords: string
    }
    updateData: (data: Partial<MetaTagsProps["data"]>) => void
}

export default function MetaTags({ data, updateData }: MetaTagsProps) {
    // Handle input changes and pass updated values to parent component
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        updateData({ [name]: value }) // Update parent formData
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* URL Input */}
                <div className="space-y-2">
                    <Label htmlFor="Url">URL</Label>
                    <Input
                        id="Url"
                        name="Url"
                        placeholder="https://..."
                        value={data.Url}
                        onChange={handleChange}
                    />
                </div>

                {/* Canonical Tag Input */}
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

                {/* Title Input */}
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
                    <div className="text-sm text-gray-500">{data?.Title?.length || 0} / 60</div>
                </div>

                {/* Description Input */}
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
                    <div className="text-sm text-gray-500">{data?.Description?.length || 0} / 165</div>
                </div>

                {/* Keywords Input */}
                <div className="space-y-2">
                    <Label htmlFor="Keywords">Keywords</Label>
                    <Textarea
                        id="Keywords"
                        name="Keywords"
                        placeholder="Enter keywords separated by commas"
                        value={data.Keywords}
                        onChange={handleChange}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
