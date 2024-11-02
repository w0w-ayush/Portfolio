import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xgegjyen", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="container max-w-[2000px] bg-secondary/50 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="bg-muted border border-slate-900 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <CardTitle className="text-4xl lg:text-5xl font-bold text-center bg-clip-text">
              Get in Touch
            </CardTitle>
            <p className="text-lg text-center text-gray-400 font-light">
              Have a question or proposal? Drop me a message!
            </p>
          </CardHeader>
          <CardContent className="space-y-6 ">
            {success && (
              <Alert className="bg-green-900/30 border-green-700 text-white">
                <CheckCircle className="h-5 w-5" />
                <AlertDescription>
                  Message sent successfully! I'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert className="bg-red-900/30 border-red-500 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="pl-10 py-6 bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="_replyto"
                    placeholder="Your email address"
                    required
                    className="pl-10 py-6 bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="pl-10 py-6 bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <Textarea
                name="message"
                placeholder="Your message"
                required
                className="min-h-[200px] bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:from-blue-600 hover:to-purple-600 text-white py-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
