'use client'

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaTags from '../meta-tags/meta-tags'
import AirlineInfo from '../airline-information/airline-information'
import Content from '../content/content'
import Fleet from '../fleet/fleet'
import Routes from '../routes/route'
import Baggage from '../baggage/baggage'
import Resources from '../resources/resources'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const TAB_ORDER = ["meta", "airline", "content", "fleet", "routes", "baggage", "resources"]

const initialFormData = {
    AirlineId: 0,
    URL: "",
    CanonicalTag: "",
    Title: "",
    Description: "",
    Keywords: "",
    AirlineName: "",
    FullName: "",
    Domestic: "N",
    International: "N",
    IataCode: "",
    IcaoCode: "",
    CallSign: "",
    CheckInUrl: "",
    ImageUrl: "",
    FoundedDate: "",
    BaseHub: "",
    FleetSize: "",
    AvgFleetAge: "",
    Website: "",
    FlightStatusUrl: "",
    Email: "",
    CSNo: "",
    HLNo: "",
    FlightTrackingUrl: "",
    OfficeAddress: "",
    CountryId: 0,
    Contents: [],
    Fleets: [],
    Routes: [],
    Baggages: [],
    Resources: [],
    Faqs: [],
    SessionId: localStorage.getItem('sessionId') || "syst",
    CreateId: 101
}

export default function AddAirlineForm() {
    const [currentTab, setCurrentTab] = useState(TAB_ORDER[0])
    const [formData, setFormData] = useState(initialFormData)
    const [isFormValid, setIsFormValid] = useState(false)

    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('https://api.nixtour.com/api/CMS/AirlineSave', {
                method: 'POST',
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast.success("Airline saved successfully!", { autoClose: 2000 });
                setTimeout(() => router.push('/airlines'), 2000);
            } else {
                const errorResponse = await response.json();
                console.error("Validation errors:", errorResponse.errors);
                toast.error("Validation errors: " + JSON.stringify(errorResponse.errors, null, 2), { autoClose: 5000 });
            }
        } catch (error) {
            console.error("Error saving airline:", error);
            toast.error("An error occurred while saving. Please try again.", { autoClose: 5000 });
        }
    }

    const updateFormData = (tab: string, data: any) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    const handleNavigation = (direction: 'next' | 'back') => {
        const currentIndex = TAB_ORDER.indexOf(currentTab);
        const newIndex = direction === 'next'
            ? Math.min(currentIndex + 1, TAB_ORDER.length - 1)
            : Math.max(currentIndex - 1, 0);

        if (direction === 'next') {
            if (currentTab === "meta") {
                const { Title, Description, Keywords } = formData;
                if (!Title || !Description || !Keywords) {
                    toast.error("Please fill in all required fields in the Meta Tags section.");
                    return;
                }
            }

            if (currentTab === "airline") {
                const { AirlineName, IataCode, IcaoCode, CallSign, CheckInUrl, BaseHub, Website, FleetSize, OfficeAddress, CountryId, FlightStatusUrl, FlightTrackingUrl, CSNo } = formData;
                if (!AirlineName || !IataCode || !IcaoCode || !CallSign || !CheckInUrl || !BaseHub || !Website || !FleetSize || !OfficeAddress || !CountryId || !FlightStatusUrl || !FlightTrackingUrl || !CSNo) {
                    toast.error("Please fill in all required fields in the Airline section.");
                    return;
                }
            }

            if (currentTab === "routes") {
                const invalidRoutes = formData.Routes.some((route: any) => !route.Origin || !route.Destination || !route.Duration);
                if (invalidRoutes) {
                    toast.error("Please fill in all required fields in the Routes section.");
                    return;
                }
            }
        }

        setCurrentTab(TAB_ORDER[newIndex]);
    };


    const resetFormData = () => {
        setFormData(initialFormData)
        toast.info("Form has been cleared.", { autoClose: 3000 });
    }

    useEffect(() => {
        const airlineData = searchParams.get('airlineData');

        if (airlineData) {
            try {
                
                const parsedData = JSON.parse(airlineData);
                setFormData((prev) => ({
                    ...prev,
                    ...parsedData,

                    Routes: parsedData.Routes.map((route: any) => ({
                        ...route,
                        Duration: route.TotDuration,
                        CheapestFlight: route.IsCheapFlight || "N",
                        HighestSelling: route.IsHighestSelling || "N",
                        Flight: route.FlightName || "",
                    })),

                    Resources: parsedData.Resources.map((resource: any) => ({
                        ...resource,
                        ResourceUrl: resource.URL || "",
                    })),

                    Baggages: parsedData.Baggages.map((baggage: any) => ({
                        ...baggage,
                        ClassTypeId: baggage.ClassId || 0,
                    })),


                    SessionId: prev.SessionId || localStorage.getItem('sessionId') || "syst",
                }));
            } catch (error) {
                console.error('Error parsing airline data:', error);
            }
        }
    }, [searchParams]);

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-7">
                        {TAB_ORDER.map(tab => (
                            <TabsTrigger key={tab} value={tab}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {TAB_ORDER.map(tab => (
                        <TabsContent key={tab} className="mt-4" value={tab}>
                            {tab === "meta" && <MetaTags data={formData} updateData={(data) => updateFormData("meta", data)} onValidationChange={setIsFormValid} />}
                            {tab === "airline" && <AirlineInfo data={formData} updateData={(data) => updateFormData("airline", data)} onValidationChange={setIsFormValid} />}
                            {tab === "content" && <Content data={{ Contents: formData.Contents }} updateData={(data) => updateFormData("content", data)} />}
                            {tab === "fleet" && <Fleet data={{ Fleets: formData.Fleets }} updateData={(data) => updateFormData("fleet", data)} />}
                            {tab === "routes" && <Routes data={{ Routes: formData.Routes }} updateData={(data) => updateFormData("routes", { Routes: data.Routes })} onValidationChange={setIsFormValid} />}
                            {tab === "baggage" && <Baggage data={{ Baggages: formData.Baggages }} updateData={(data) => updateFormData("baggage", { Baggages: data.Baggages })} />}
                            {tab === "resources" && <Resources data={{ Resources: formData.Resources, Faqs: formData.Faqs }} updateData={(data) => updateFormData("resources", data)} />}
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation('back');
                        }}
                        disabled={currentTab === TAB_ORDER[0]}
                    >
                        Back
                    </Button>
                    <div className="flex gap-4">
                        <Button onClick={resetFormData} type="button" variant="outline">Clear</Button>
                        {currentTab === TAB_ORDER[TAB_ORDER.length - 1] ? (
                            <Button className="bg-[#BC1110] hover:bg-[#A00D0C] text-white" type="submit" disabled={!isFormValid}>Save</Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavigation('next')
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}
