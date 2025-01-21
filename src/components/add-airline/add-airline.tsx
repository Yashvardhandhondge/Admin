'use client'

import { use, useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePicker } from 'antd';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useAirlineStore } from '../../store/useAirlineStore';

export default function AddAirlineForm() {
    const [date, setDate] = useState<Date>()
    const [content, setContent] = useState([{ type: '', content: '' }])
    const [fleet, setFleet] = useState([{ aircraftType: '', total: '' }])
    const [routes, setRoutes] = useState([{
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        flight: '',
        startingPrice: '',
        cheapestFlight: false,
        highestSelling: false
    }])
    const [baggage, setBaggage] = useState([{
        classType: '',
        fareType: '',
        luggage: '',
        changeCancellation: '',
        addon: ''
    }])
    const [resources, setResources] = useState([{ resource: '', url: '', category: '' }])
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const {
        countries,
        fetchCountries,
        loading,
        contentTypes,
        fetchContentTypes,
        aircraftTypes,
        fetchAircraftTypes,
        airlineClassTypes,
        fetchAirlineClassTypes,
        error,
        resourceTypeList,
        fetchResourceTypeList,
        airlineStations,
        fetchAirlineStations
    } = useAirlineStore();

    useEffect(() => {
        fetchCountries();
        fetchContentTypes();
        fetchAircraftTypes();
        fetchAirlineClassTypes();
        fetchResourceTypeList();
        fetchAirlineStations();
    }, [
        fetchCountries,
        fetchContentTypes,
        fetchAircraftTypes,
        fetchAirlineClassTypes,
        fetchResourceTypeList,
        fetchAirlineStations
    ]);


    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Tabs defaultValue="meta" className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                    <TabsTrigger value="airline">Airline</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="fleet">Fleet</TabsTrigger>
                    <TabsTrigger value="routes">Routes</TabsTrigger>
                    <TabsTrigger value="baggage">Baggage</TabsTrigger>
                    <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>

                <TabsContent className='mt-4' value="meta">
                    <Card>
                        <CardHeader>
                            <CardTitle>Meta Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label>URL</label>
                                <Textarea placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <label>Canonical Tag</label>
                                <Input placeholder="https://www.example.com" />
                            </div>
                            <div className="space-y-2">
                                <label>Title (60 characters)</label>
                                <Textarea />
                            </div>
                            <div className="space-y-2">
                                <label>Description (165 characters)</label>
                                <Textarea />
                            </div>
                            <div className="space-y-2">
                                <label>Keywords</label>
                                <Textarea />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className='mt-4' value="airline">
                    <Card>
                        <CardHeader>
                            <CardTitle>Airline Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label>Airline Name</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Full Name</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label className="font-medium text-gray-700">Airline Type</label>
                                <div className="flex items-center space-x-4">

                                    <div className="flex items-center space-x-2">
                                        <Checkbox />
                                        <label htmlFor="domestic" className="text-gray-600">
                                            Domestic
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox />
                                        <label htmlFor="international" className="text-gray-600">
                                            International
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label>IATA</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>ICAO</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Call Sign</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Check-in URL</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Image</label>
                                <Input className='pt-[6px]' type='file' />
                            </div>
                            <div className="space-y-2">
                                <label>Founded Date</label>
                                <DatePicker
                                    className="w-full py-[6px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label>Base Hub</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Fleet Size</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Average Fleet Age</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Website</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Flight Status URL</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Email</label>
                                <Input type="email" />
                            </div>
                            <div className="space-y-2">
                                <label>Customer Service No.</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Helpline No.</label>
                                <Input />
                            </div>
                            <div className="space-y-2">
                                <label>Tracking URL</label>
                                <Input />
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label>Office Address</label>
                                <Textarea />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="country">Country</label>
                                <select className='border px-3 py-2 rounded focus:outline-none' name="" id="">
                                    <option value="">Select a country</option>
                                    {loading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        countries.map((country) => (
                                            <option key={country.CountryId} value={country.CountryId}>
                                                {country.CountryName}
                                            </option>
                                        ))
                                    )}
                                    {countries.map((country) => (
                                        <option key={country.CountryId} value={country.CountryId}>
                                            {country.CountryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className='mt-4' value="content">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Content
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setContent([...content, { type: '', content: '' }])}
                                >
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
                                    {content.map((_item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                                    <option value="">Select content type</option>
                                                    {loading ? (
                                                        <option>Loading...</option>
                                                    ) : (
                                                        contentTypes.map((contentType) => (
                                                            <option key={contentType.ContentTypeId} value={contentType.ContentTypeId}>
                                                                {contentType.ContentTypeName}
                                                            </option>
                                                        ))
                                                    )}
                                                    {contentTypes.map((contentType) => (
                                                        <option key={contentType.ContentTypeId} value={contentType.ContentTypeId}>
                                                            {contentType.ContentTypeName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Input />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newContent = [...content]
                                                        newContent.splice(index, 1)
                                                        setContent(newContent)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className='mt-4' value="fleet">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Fleet
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFleet([...fleet, { aircraftType: '', total: '' }])}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Aircraft
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S.No.</TableHead>
                                        <TableHead>Aircraft Type</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fleet.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                                    <option value="">Select aircraft type</option>
                                                    {loading ? (
                                                        <option>Loading...</option>
                                                    ) : (
                                                        aircraftTypes.map((aircraftType) => (
                                                            <option key={aircraftType.AircraftTypeId} value={aircraftType.AircraftTypeId}>
                                                                {aircraftType.AircraftTypeName}
                                                            </option>
                                                        ))
                                                    )}
                                                    {aircraftTypes.map((aircraftType) => (
                                                        <option key={aircraftType.AircraftTypeId} value={aircraftType.AircraftTypeId}>
                                                            {aircraftType.AircraftTypeName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Input type="number" />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newFleet = [...fleet]
                                                        newFleet.splice(index, 1)
                                                        setFleet(newFleet)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className='mt-4' value="routes">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Routes
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setRoutes([...routes, {
                                        origin: '',
                                        destination: '',
                                        departureTime: '',
                                        arrivalTime: '',
                                        duration: '',
                                        flight: '',
                                        startingPrice: '',
                                        cheapestFlight: false,
                                        highestSelling: false
                                    }])}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Route
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S.No.</TableHead>
                                        <TableHead>Origin</TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead>Departure Time</TableHead>
                                        <TableHead>Arrival Time</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Flight</TableHead>
                                        <TableHead>Starting Price</TableHead>
                                        <TableHead>Cheapest Flight</TableHead>
                                        <TableHead>Highest Selling</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {routes.map((route, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Input placeholder='Origin' />
                                            </TableCell>
                                            <TableCell>
                                                <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                                    <option value="">Select destination</option>
                                                    {loading ? (
                                                        <option>Loading...</option>
                                                    ) : (
                                                        airlineStations.map((station) => (
                                                            <option key={station.StationId} value={station.StationId}>
                                                                {station.StationName}
                                                            </option>
                                                        ))
                                                    )}
                                                    {airlineStations.map((station) => (
                                                        <option key={station.StationId} value={station.StationId}>
                                                            {station.StationName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Input type="time" />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="time" />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="2h 30m" />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="Flight number" />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newRoutes = [...routes]
                                                        newRoutes.splice(index, 1)
                                                        setRoutes(newRoutes)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className='mt-4' value="baggage">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Baggage Allowance
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setBaggage([...baggage, {
                                        classType: '',
                                        fareType: '',
                                        luggage: '',
                                        changeCancellation: '',
                                        addon: ''
                                    }])}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Baggage Rule
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>S.No.</TableHead>
                                        <TableHead>Class Type</TableHead>
                                        <TableHead>Fare Type</TableHead>
                                        <TableHead>Luggage</TableHead>
                                        <TableHead>Change/Cancellation</TableHead>
                                        <TableHead>ADD-ON</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {baggage.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {loading ? (
                                                    <span>Loading...</span>
                                                ) : error ? (
                                                    <span>{error}</span>
                                                ) : (
                                                    <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm'>
                                                        <option value="">Select Class Type</option>
                                                        {airlineClassTypes.map((classType) => (
                                                            <option key={classType.ClassId} value={classType.ClassId}>
                                                                {classType.ClassName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="Fare type" />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="Luggage allowance" />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="Change/Cancellation rules" />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="Additional services" />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newBaggage = [...baggage]
                                                        newBaggage.splice(index, 1)
                                                        setBaggage(newBaggage)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent className="mt-4" value="other">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Useful Resources
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setResources([
                                                ...resources,
                                                { resource: '', url: '', category: '' },
                                            ])
                                        }
                                    >
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
                                        {resources.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm'>
                                                        <option value="">Select Resource</option>
                                                        {resourceTypeList.map((resource) => (
                                                            <option key={resource.ResourceTypeId} value={resource.ResourceTypeId}>
                                                                {resource.ResourceTypeName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Resource URL"
                                                        value={item.url}
                                                        onChange={(e) => {
                                                            const newResources = [...resources];
                                                            newResources[index].url = e.target.value;
                                                            setResources(newResources);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newResources = [...resources];
                                                            newResources.splice(index, 1);
                                                            setResources(newResources);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* The FAQ Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    FAQ
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                                    >
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
                                        {faqs.map((faq, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Textarea placeholder="Question" />
                                                </TableCell>
                                                <TableCell>
                                                    <Textarea placeholder="Answer" />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newFaqs = [...faqs];
                                                            newFaqs.splice(index, 1);
                                                            setFaqs(newFaqs);
                                                        }}
                                                    >
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
                </TabsContent>

            </Tabs>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                    Clear
                </Button>
                <Button className='bg-[#BC1110] hover:bg-[#A00D0C] text-white' type="submit">Save</Button>
            </div>
        </form>
    )
}

