import type { Control, UseFormRegister, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import type { FormValues } from "../../types/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface ServicesTabProps {
    control: Control<FormValues>
    register: UseFormRegister<FormValues>
    getValues: UseFormGetValues<FormValues>
    setValue: UseFormSetValue<FormValues>
    watch: UseFormWatch<FormValues>
}

export function Services({ register, getValues, setValue, watch }: ServicesTabProps) {
    return (
        <TabsContent value="services">
            <Card>
                <CardHeader>
                    <CardTitle>Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Services</TableHead>
                                <TableHead>Minimum booking Amount</TableHead>
                                <TableHead>Offer / Discount</TableHead>
                                <TableHead>Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {watch("services").map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Input placeholder="services" {...register(`services.${index}.service`)} />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="minimum booking amount" {...register(`services.${index}.minBooking`)} />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="offer " {...register(`services.${index}.discount`)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                const services = getValues("services")
                                                services.splice(index, 1)
                                                setValue("services", services)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                            const services = getValues("services")
                            services.push({ service: "", minBooking: 0, discount: "" })
                            setValue("services", services)
                        }}
                    >
                        Add Service
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

