"use client"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)
    alert("Thank you for your message. We'll get back to you soon!")
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Get in touch with our team for inquiries, support, or to discuss your project needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Inquiry Type</Label>
              <RadioGroup
                defaultValue="general"
                value={formData.inquiryType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, inquiryType: value }))}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general">General Inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sales" id="sales" />
                  <Label htmlFor="sales">Sales</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="support" id="support" />
                  <Label htmlFor="support">Technical Support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partnership" id="partnership" />
                  <Label htmlFor="partnership">Partnership</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide details about your inquiry..."
                className="min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">123 Industrial Parkway</p>
                    <p className="text-gray-600">Business District, 10001</p>
                    <p className="text-gray-600">Country</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (123) 456-7890</p>
                    <p className="text-gray-600">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@companyname.com</p>
                    <p className="text-gray-600">support@companyname.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Global Locations</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">North America Headquarters</p>
                    <p className="text-gray-600">123 Industrial Parkway, Business District, 10001</p>
                  </div>
                  <div>
                    <p className="font-medium">Europe Office</p>
                    <p className="text-gray-600">45 Technology Boulevard, Innovation Center, Berlin</p>
                  </div>
                  <div>
                    <p className="font-medium">Asia Pacific Office</p>
                    <p className="text-gray-600">78 Manufacturing Road, Industrial Zone, Singapore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
