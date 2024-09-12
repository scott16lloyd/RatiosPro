'use client';

import { TopNavBar } from '@/components/ui/top-nav-bar';
import { ComparisonSelector } from '@/components/ui/comparison-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ComparePage() {
  return (
    <main className="w-full h-screen flex flex-col justify-start items-center gap-4">
      <TopNavBar />
      <div className="w-full flex flex-col items-center gap-4">
        <ComparisonSelector index={1} />
        <ComparisonSelector index={2} />
      </div>
      <div className="w-full flex flex-col items-center">
        <Tabs
          defaultValue="roa"
          className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 gap-2"
        >
          <TabsList className="w-full">
            <TabsTrigger value="roa" className="w-full">
              ROA
            </TabsTrigger>
            <TabsTrigger value="password" className="w-full">
              RT
            </TabsTrigger>
            <TabsTrigger value="account" className="w-full">
              ROE
            </TabsTrigger>
          </TabsList>
          {/* <TabsContent value="account">
            Make changes to your account here.
          </TabsContent> */}
          {/* <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
      </div>
    </main>
  );
}
