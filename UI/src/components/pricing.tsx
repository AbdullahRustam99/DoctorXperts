import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  popular?: boolean
}

interface Feature {
  name: string
  basic: string | boolean
  business: string | boolean
  enterprise: string | boolean
}

const plans: PricingPlan[] = [
  { name: "Basic", price: "$19", period: "/mo", description: "Ideal for individuals" },
  { name: "Business", price: "$29", period: "/mo", description: "Perfect for small teams" },
  { name: "Enterprise", price: "$49", period: "/mo", description: "Best for large organizations" },
]

const includedFeatures: Feature[] = [
  { name: "Access to health resources", basic: "10", business: "25", enterprise: "Unlimited" },
  { name: "Personalized health plans", basic: true, business: true, enterprise: true },
  { name: "24/7 customer support", basic: true, business: true, enterprise: true },
  { name: "Monthly health insights", basic: false, business: true, enterprise: true },
  { name: "Wellness tracking tools", basic: false, business: false, enterprise: true },
]

const additionalFeatures: Feature[] = [
  { name: "Group health assessments", basic: "10", business: "25", enterprise: "Unlimited" },
  { name: "Customizable health programs", basic: true, business: true, enterprise: true },
  { name: "Dedicated account manager", basic: true, business: true, enterprise: true },
  { name: "Exclusive member discounts", basic: false, business: true, enterprise: true },
  { name: "Health webinars and workshops", basic: false, business: false, enterprise: true },
]

const premiumFeatures: Feature[] = [
  { name: "Advanced analytics tools", basic: "10", business: "25", enterprise: "Unlimited" },
  { name: "Health risk assessments", basic: true, business: true, enterprise: true },
  { name: "Nutrition and diet plans", basic: true, business: true, enterprise: true },
  { name: "Fitness coaching sessions", basic: false, business: true, enterprise: true },
  { name: "Mental health resources", basic: false, business: false, enterprise: true },
]

const FeatureRow = ({ feature }: { feature: Feature }) => (
  <tr className="border-b border-gray-200">
    <td className="py-3 pl-4 text-left text-sm text-gray-700">{feature.name}</td>
    <td className="py-3 text-center">
      {typeof feature.basic === "boolean" ? (
        feature.basic ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : null
      ) : (
        <span className="text-sm text-gray-700">{feature.basic}</span>
      )}
    </td>
    <td className="py-3 text-center">
      {typeof feature.business === "boolean" ? (
        feature.business ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : null
      ) : (
        <span className="text-sm text-gray-700">{feature.business}</span>
      )}
    </td>
    <td className="py-3 text-center">
      {typeof feature.enterprise === "boolean" ? (
        feature.enterprise ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : null
      ) : (
        <span className="text-sm text-blue-600 font-medium">{feature.enterprise}</span>
      )}
    </td>
  </tr>
)

const SectionHeader = ({ title }: { title: string }) => (
  <tr>
    <td colSpan={4} className="bg-secondary py-3 pl-4 text-left font-semibold text-gray-800">
      {title}
    </td>
  </tr>
)

const MobileFeatureSection = ({ title, features }: { title: string; features: Feature[] }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-gray-900 bg-secondary px-4 py-2 rounded">{title}</h3>
    <div className="divide-y">
      {features.map((feature, index) => (
        <div key={index} className="p-4">
          <p className="font-medium text-gray-800 mb-2 text-center">{feature.name}</p>
          <div className="grid grid-cols-3 text-center text-sm justify-items-center ">
            <div>
              <p className="text-gray-600">Basic</p>
              {typeof feature.basic === "boolean" ? (
                feature.basic ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : "-"
              ) : (
                <span>{feature.basic}</span>
              )}
            </div>
            <div>
              <p className="text-gray-600">Business</p>
              {typeof feature.business === "boolean" ? (
                feature.business ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : "-"
              ) : (
                <span>{feature.business}</span>
              )}
            </div>
            <div>
              <p className="text-gray-600">Enterprise</p>
              {typeof feature.enterprise === "boolean" ? (
                feature.enterprise ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : "-"
              ) : (
                <span className="text-blue-600 font-medium">{feature.enterprise}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function PricingPlans() {
  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Affordable</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
        <p className="text-gray-600">Choose the right plan for your health needs.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="text-center">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-lime-500">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 text-left font-medium text-gray-900">Features</th>
                <th className="py-4 text-center font-medium text-gray-900">Basic</th>
                <th className="py-4 text-center font-medium text-gray-900">Business</th>
                <th className="py-4 text-center font-medium text-gray-900">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <SectionHeader title="Included Features" />
              {includedFeatures.map((feature, index) => (
                <FeatureRow key={`included-${index}`} feature={feature} />
              ))}

              <SectionHeader title="Additional Features" />
              {additionalFeatures.map((feature, index) => (
                <FeatureRow key={`additional-${index}`} feature={feature} />
              ))}

              <SectionHeader title="Premium Features" />
              {premiumFeatures.map((feature, index) => (
                <FeatureRow key={`premium-${index}`} feature={feature} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="block md:hidden p-2">
          <MobileFeatureSection title="Included Features" features={includedFeatures} />
          <MobileFeatureSection title="Additional Features" features={additionalFeatures} />
          <MobileFeatureSection title="Premium Features" features={premiumFeatures} />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <Button
            key={plan.name}
            className="w-full bg-secondary hover:bg-lime-500 text-gray-900 font-medium py-3"
          >
            Get {plan.name} Plan
          </Button>
        ))}
      </div>
    </div>
  )
}
