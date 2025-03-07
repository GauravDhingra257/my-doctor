// src/App.jsx
import React, { useState } from 'react'
import { CheckIcon, XIcon } from 'lucide-react'

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  
  const plans = [
    {
      name: "Basic",
      id: "basic",
      description: "Essential features for small practices",
      monthlyPrice: "₹1,999",
      yearlyPrice: "₹19,990",
      yearlyDiscount: "Save ₹3,998",
      features: [
        { name: "Up to 500 patient records", included: true },
        { name: "Appointment scheduling", included: true },
        { name: "Basic reporting", included: true },
        { name: "Email support", included: true },
        { name: "Payment processing", included: true },
        { name: "Patient portal", included: false },
        { name: "Telehealth integration", included: false },
        { name: "Custom branding", included: false },
      ],
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      name: "Professional",
      id: "professional",
      description: "Advanced features for growing clinics",
      monthlyPrice: "₹3,999",
      yearlyPrice: "₹39,990",
      yearlyDiscount: "Save ₹7,998",
      popular: true,
      features: [
        { name: "Unlimited patient records", included: true },
        { name: "Appointment scheduling", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority email & phone support", included: true },
        { name: "Payment processing", included: true },
        { name: "Patient portal", included: true },
        { name: "Telehealth integration", included: true },
        { name: "Custom branding", included: false },
      ],
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      name: "Enterprise",
      id: "enterprise",
      description: "Complete solution for multi-location practices",
      monthlyPrice: "₹6,999",
      yearlyPrice: "₹69,990",
      yearlyDiscount: "Save ₹13,998",
      features: [
        { name: "Unlimited patient records", included: true },
        { name: "Appointment scheduling", included: true },
        { name: "Custom reports & analytics", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Payment processing", included: true },
        { name: "Patient portal", included: true },
        { name: "Telehealth integration", included: true },
        { name: "Custom branding", included: true },
      ],
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Subscription Plans</h1>
        <p className="text-lg text-gray-500 mb-10">Choose the right plan for your practice</p>
        
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg inline-flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 text-sm font-medium rounded-md ${
                billingCycle === 'monthly' 
                  ? 'bg-gray-100 text-gray-900 shadow-sm' 
                  : 'bg-white text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 text-sm font-medium rounded-md flex items-center ${
                billingCycle === 'yearly' 
                  ? 'bg-gray-100 text-gray-900 shadow-sm' 
                  : 'bg-white text-gray-500'
              }`}
            >
              Annual
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border ${plan.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-green-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              <div className={`p-6 ${plan.bgColor}`}>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </p>
                {billingCycle === 'yearly' && (
                  <p className="mt-1 text-sm text-green-600 font-medium">{plan.yearlyDiscount}</p>
                )}
              </div>
              <div className="border-t border-gray-200 p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      ) : (
                        <XIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mr-2" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${plan.color} ${plan.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {plan.id === 'professional' ? 'Upgrade to Professional' : `Subscribe to ${plan.name}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I upgrade or downgrade my plan later?</h3>
              <p className="text-gray-600">Yes, you can change your subscription plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply when your current billing cycle ends.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-600">You can cancel your subscription from the Settings page. Your subscription will remain active until the end of your current billing period.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">We offer a 14-day free trial on all plans. No credit card is required to start your trial.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer custom plans for larger practices?</h3>
              <p className="text-gray-600">Yes, if you have specific requirements or a large practice with multiple locations, please contact our sales team to discuss a custom enterprise solution.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}