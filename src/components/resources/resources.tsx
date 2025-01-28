"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAirlineStore } from "@/store/useAirlineStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResourcesProps {
    data: {
        Resources: Array<{ ResourceTypeId: number; ResourceUrl: string }>
        Faqs: Array<{ Question: string; Answer: string }>
    }
    updateData: (data: Partial<ResourcesProps["data"]>) => void
}

export default function Resources({ data, updateData }: ResourcesProps) {
    const { fetchResourceTypeList, resourceTypeList } = useAirlineStore()

    useEffect(() => {
        fetchResourceTypeList()
    }, [fetchResourceTypeList])

    const addResource = () => {
        const newResources = [...data.Resources, { ResourceTypeId: 0, ResourceUrl: "" }]
        updateData({ Resources: newResources })
    }

    const removeResource = (index: number) => {
        const newResources = [...data.Resources]
        newResources.splice(index, 1)
        updateData({ Resources: newResources })
    }

    const updateResource = (
        index: number,
        field: keyof ResourcesProps["data"]["Resources"][0],
        value: string | number,
    ) => {
        const newResources = [...data.Resources]
        newResources[index] = { ...newResources[index], [field]: value }
        updateData({ Resources: newResources })
    }

    const addFaq = () => {
        const newFaqs = [...data.Faqs, { Question: "", Answer: "" }]
        updateData({ Faqs: newFaqs })
    }

    const removeFaq = (index: number) => {
        const newFaqs = [...data.Faqs]
        newFaqs.splice(index, 1)
        updateData({ Faqs: newFaqs })
    }

    const updateFaq = (index: number, field: keyof ResourcesProps["data"]["Faqs"][0], value: string) => {
        const newFaqs = [...data.Faqs]
        newFaqs[index] = { ...newFaqs[index], [field]: value }
        updateData({ Faqs: newFaqs })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Useful Resources
                        <Button type="button" variant="outline" size="sm" onClick={addResource}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Resource
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Resource</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.Resources?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={item.ResourceTypeId.toString()}
                                            onValueChange={(value) => updateResource(index, "ResourceTypeId", Number.parseInt(value))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Resource" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {resourceTypeList.map((resource) => (
                                                    <SelectItem key={resource.ResourceTypeId} value={resource.ResourceTypeId.toString()}>
                                                        {resource.ResourceTypeName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            placeholder="Resource URL"
                                            value={item.ResourceUrl}
                                            onChange={(e) => updateResource(index, "ResourceUrl", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeResource(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        FAQ
                        <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add FAQ
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead>Answer</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.Faqs?.map((faq, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Textarea
                                            placeholder="Question"
                                            value={faq.Question}
                                            onChange={(e) => updateFaq(index, "Question", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Textarea
                                            placeholder="Answer"
                                            value={faq.Answer}
                                            onChange={(e) => updateFaq(index, "Answer", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

