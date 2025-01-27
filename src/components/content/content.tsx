"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { useAirlineStore } from "@/store/useAirlineStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentProps {
    data: {
        Contents: Array<{ ContentTypeId: number; Content: string }>
    }
    updateData: (data: Partial<ContentProps["data"]>) => void
}

export default function Content({ data, updateData }: ContentProps) {
    const { contentTypes, fetchContentTypes, loading } = useAirlineStore()

    useEffect(() => {
        fetchContentTypes()
    }, [fetchContentTypes])

    const addContent = () => {
        const newContents = [...data.Contents, { ContentTypeId: 0, Content: "" }]
        updateData({ Contents: newContents })
    }

    const removeContent = (index: number) => {
        const newContents = [...data.Contents]
        newContents.splice(index, 1)
        updateData({ Contents: newContents })
    }

    const updateContent = (index: number, field: "ContentTypeId" | "Content", value: number | string) => {
        const newContents = [...data.Contents]
        newContents[index] = { ...newContents[index], [field]: value }
        updateData({ Contents: newContents })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Content
                    <Button type="button" variant="outline" size="sm" onClick={addContent}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Content
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S.No.</TableHead>
                            <TableHead>Content Type</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.Contents?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Select
                                        value={item.ContentTypeId.toString()}
                                        onValueChange={(value) => updateContent(index, "ContentTypeId", Number.parseInt(value))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select content type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loading ? (
                                                <SelectItem value="0">Loading...</SelectItem>
                                            ) : (
                                                contentTypes.map((contentType) => (
                                                    <SelectItem key={contentType.ContentTypeId} value={contentType.ContentTypeId.toString()}>
                                                        {contentType.ContentTypeName}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input value={item.Content} onChange={(e) => updateContent(index, "Content", e.target.value)} />
                                </TableCell>
                                <TableCell>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeContent(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

