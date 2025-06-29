"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail, FileText, Video, BookOpen, Clock, CheckCircle, AlertCircle, Download, ExternalLink, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });

  const faqItems = [
    {
      category: "Account",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your email, create a password, and verify your email address.",
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "On the login page, click 'Forgot Password'. Enter your email address and we'll send you a reset link. Follow the instructions in the email to create a new password.",
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to Settings > Profile Information. You can update your personal details, contact information, and profile picture there.",
        },
      ],
    },
    {
      category: "Orders",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Browse our products, add items to your cart, proceed to checkout, enter your shipping information, and complete the payment process.",
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 1 hour of placement if they haven't been processed yet. Go to 'My Orders' and click 'Cancel Order' if available.",
        },
        {
          question: "How do I track my order?",
          answer: "You'll receive a tracking number via email once your order ships. You can also check the status in 'My Orders' section of your account.",
        },
      ],
    },
    {
      category: "Payments",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets like Apple Pay and Google Pay.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your full credit card details.",
        },
        {
          question: "Can I get a refund?",
          answer: "Refunds are available within 30 days of purchase for most items. See our refund policy for specific terms and conditions.",
        },
      ],
    },
    {
      category: "Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping varies by location.",
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination.",
        },
        {
          question: "What if my package is damaged?",
          answer: "Contact our support team immediately with photos of the damaged package. We'll arrange a replacement or refund.",
        },
      ],
    },
  ];

  const quickLinks = [
    { title: "Getting Started Guide", icon: BookOpen, description: "Learn the basics of using our platform" },
    { title: "Video Tutorials", icon: Video, description: "Watch step-by-step video guides" },
    { title: "API Documentation", icon: FileText, description: "Technical documentation for developers" },
    { title: "System Status", icon: CheckCircle, description: "Check our current system status" },
    { title: "Download Center", icon: Download, description: "Download our mobile apps and resources" },
    { title: "Community Forum", icon: MessageCircle, description: "Join discussions with other users" },
  ];

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "Available 24/7",
      action: "Start Chat",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support agent",
      icon: Phone,
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      availability: "Response within 24 hours",
      action: "Send Email",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Your message has been sent! We'll get back to you soon.");
    setContactForm({ name: "", email: "", subject: "", message: "", priority: "medium" });
  };

  const filteredFAQ = faqItems
    .map((category) => ({
      ...category,
      questions: category.questions.filter((q) => searchQuery === "" || q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl mx-auto px-4 mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to your questions or get in touch with our support team</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input type="text" placeholder="Search for help articles, FAQs, and more..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 py-3 text-lg" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <link.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find quick answers to the most common questions</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredFAQ.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse all categories below.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredFAQ.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.category}</h3>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {contactOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      {option.availability}
                    </div>
                    <Button variant="outline" className="w-full">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Can't find what you're looking for? Send us a detailed message and we'll help you out.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" value={contactForm.name} onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={contactForm.email} onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="your.email@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={contactForm.subject} onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))} placeholder="Brief description of your issue" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select id="priority" value={contactForm.priority} onChange={(e) => setContactForm((prev) => ({ ...prev, priority: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your issue or question in detail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Documentation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentation
                  </CardTitle>
                  <CardDescription>Comprehensive guides and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">User Guide</h4>
                      <p className="text-sm text-gray-600">Complete user manual</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">API Reference</h4>
                      <p className="text-sm text-gray-600">Technical API documentation</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Best Practices</h4>
                      <p className="text-sm text-gray-600">Tips and recommendations</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Video Tutorials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>Step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Getting Started</h4>
                      <p className="text-sm text-gray-600">5 min tutorial</p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Advanced Features</h4>
                      <p className="text-sm text-gray-600">15 min tutorial</p>
                    </div>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Troubleshooting</h4>
                      <p className="text-sm text-gray-600">10 min tutorial</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  System Status
                </CardTitle>
                <CardDescription>Current status of our services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>API Services</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Website</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Service</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Degraded
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;
