'use client'
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import MetaTags from '../meta-tags/meta-tags';
import AirLineInfo from '../airline-information/airline-information';
import Content from '../content/content';
import Fleet from '../fleet/fleet';
import Route from '../routes/route';
import Baggage from '../baggage/baggage'
import Resources from '../resources/resources'

export default function AddAirlineForm() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }


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
                    <MetaTags />
                </TabsContent>

                <TabsContent className='mt-4' value="airline">
                    <AirLineInfo />
                </TabsContent>

                <TabsContent className='mt-4' value="content">
                    <Content />
                </TabsContent>

                <TabsContent className='mt-4' value="fleet">
                    <Fleet />
                </TabsContent>

                <TabsContent className='mt-4' value="routes">
                    <Route />
                </TabsContent>

                <TabsContent className='mt-4' value="baggage">
                    <Baggage />
                </TabsContent>

                <TabsContent className="mt-4" value="other">
                    <Resources />
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

