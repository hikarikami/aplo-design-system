import { useNavigate } from 'react-router-dom'
import { ArrowRight, Users, Compass, Zap, BarChart2, GitMerge, RefreshCw } from 'lucide-react'
import { Button, Container, Hero, Stack } from '@aplo/ui'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <Stack>
        <Hero
          backgroundEffect="stipple-follow"
          className="min-h-[calc(90vh-3.5rem)] flex items-center"
          globeShadowAngle={225}
          globeShadowStrength={0.95}
        >
          <Container className="py-24 space-y-8">
            <h1 className="text-8xl font-medium tracking-tight leading-tight max-w-4xl">
              Digital Change, Without The Challenge.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Aplo is the home of passionate crusaders, transforming businesses for digital success.
            </p>
            <div className="flex gap-3 pt-2">
              <Button size="lg" variant="primary" className="group" onClick={() => navigate('#')}>
                Speak To Us <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">Learn more</Button>
            </div>
          </Container>
        </Hero>
      </Stack>

      <Stack as="section" className="bg-primary">
        <Container className="py-24 space-y-16">

    

           <div className="space-y-4 max-w-2xl">
    
            <h2 className="text-5xl font-bold tracking-tight leading-default text-white"> Transform with confidence, Deliver with clarity.</h2>
            <p className="text-lg text-white leading-relaxed">
               We embed alongside your team — bringing UX expertise, digital strategy, and execution capability to every engagement.
            </p>
          </div>

          <div className="border-t border-white/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {[
              {
                icon: <Users className="size-6" />,
                title: 'Human-Centred Design',
                description: 'Research-led UX that puts your customers first — from discovery through to polished, validated interfaces.',
              },
              {
                icon: <Compass className="size-6" />,
                title: 'Digital Strategy',
                description: 'Clear roadmaps for complex transformations. We align technology decisions with your business outcomes.',
              },
              {
                icon: <Zap className="size-6" />,
                title: 'Rapid Product Delivery',
                description: 'Cross-functional squads that move fast without cutting corners — shipping value in weeks, not quarters.',
              },
              {
                icon: <GitMerge className="size-6" />,
                title: 'Change Management',
                description: 'Adoption doesn\'t happen by accident. We plan for the human side of change from day one.',
              },
              {
                icon: <BarChart2 className="size-6" />,
                title: 'Data & Analytics',
                description: 'Instrumented products and evidence-based decisions — so you know what\'s working and what to fix.',
              },
              {
                icon: <RefreshCw className="size-6" />,
                title: 'Continuous Improvement',
                description: 'Post-launch isn\'t the end. We build feedback loops that compound improvements over time.',
              },
            ].map(({ icon, title, description }) => (
              <div key={title} className="bg-primary px-8 py-10 space-y-4">
                <div className="text-white/80">{icon}</div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </Stack>

      <Stack as="section" className="bg-background">
        <Container className="py-32 space-y-20">

          <div className="space-y-4 max-w-2xl">

            <h2 className="text-5xl font-bold tracking-tight">Built for teams who move fast.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with organisations at every stage — from early-stage startups defining their
              product to established enterprises modernising how they work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {[
              { label: 'Projects delivered', value: '120+' },
              { label: 'Countries', value: '14' },
              { label: 'Years in busineseess', value: '8' },
              { label: 'NPS score', value: '72' },
              { label: 'Team members', value: '34' },
              { label: 'Repeat clients', value: '91%' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-background px-8 py-10 space-y-1">
                <p className="text-4xl font-bold tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button size="lg" variant='primary'>Work with us</Button>
            <Button size="lg" variant="outline">View case studies</Button>
          </div>

        </Container>
      </Stack>
    </>
  )
}
