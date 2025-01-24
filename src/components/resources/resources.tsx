import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { useAirlineStore } from '../../store/useAirlineStore';
import { Textarea } from '../ui/textarea'


function Resources() {

    const [resources, setResources] = React.useState([{ resource: '', url: '', category: '' }]);
    const [faqs, setFaqs] = React.useState([{ question: '', answer: '' }]);
    const {
        resourceTypeList,
        loading
    } = useAirlineStore();
    return (
        <div>
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
        </div>
    )
}

export default Resources