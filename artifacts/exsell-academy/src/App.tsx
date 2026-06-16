import { Switch, Route } from "wouter";
import { Router as WouterRouter } from "wouter";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, RequireAuth } from "@/lib/auth";
import NotFound from "@/pages/not-found";

import RootLayout from "@/app/layout";
import MarketingLayout from "@/app/(marketing)/layout";
import AuthLayout from "@/app/(auth)/layout";
import AppLayout from "@/app/(app)/layout";
import AdminLayout from "@/app/admin/(dashboard)/layout";
import EmployerLayout from "@/app/employer/(dashboard)/layout";

// Marketing
import Home from "@/app/(marketing)/page";
import About from "@/app/(marketing)/about/page";
import Apply from "@/app/(marketing)/apply/page";
import Contact from "@/app/(marketing)/contact/page";
import Courses from "@/app/(marketing)/courses/page";
import CourseDetail from "@/app/(marketing)/courses/[slug]/page";
import Employers from "@/app/(marketing)/employers/page";
import FundedTraining from "@/app/(marketing)/funded-training/page";
import Privacy from "@/app/(marketing)/privacy/page";
import Sponsors from "@/app/(marketing)/sponsors/page";
import Terms from "@/app/(marketing)/terms/page";
import Verify from "@/app/(marketing)/verify/[id]/page";

// Auth (learner)
import LearnerLogin from "@/app/(auth)/login/page";
import Register from "@/app/(auth)/register/page";

// Learner app
import Dashboard from "@/app/(app)/dashboard/page";
import DashCourses from "@/app/(app)/dashboard/courses/page";
import DashCourseDetail from "@/app/(app)/dashboard/courses/[slug]/page";
import DashLesson from "@/app/(app)/dashboard/courses/[slug]/[lessonId]/page";
import DashQuiz from "@/app/(app)/dashboard/courses/[slug]/quiz/[quizId]/page";
import Certificates from "@/app/(app)/dashboard/certificates/page";

// Admin
import AdminLogin from "@/app/admin/login/page";
import AdminHome from "@/app/admin/(dashboard)/page";
import AdminApplications from "@/app/admin/(dashboard)/applications/page";
import AdminApplicationDetail from "@/app/admin/(dashboard)/applications/[id]/page";
import AdminPlacements from "@/app/admin/(dashboard)/placements/page";
import AdminSponsors from "@/app/admin/(dashboard)/sponsors/page";

// Employer
import EmployerLogin from "@/app/employer/login/page";
import EmployerHome from "@/app/employer/(dashboard)/page";
import EmployerTalent from "@/app/employer/(dashboard)/talent/page";
import EmployerTalentDetail from "@/app/employer/(dashboard)/talent/[id]/page";
import EmployerPipeline from "@/app/employer/(dashboard)/pipeline/page";
import EmployerPlacements from "@/app/employer/(dashboard)/placements/page";
import EmployerRoles from "@/app/employer/(dashboard)/roles/page";

const queryClient = new QueryClient();

function Marketing({ children }: { children: ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}

function Learner({ children }: { children: ReactNode }) {
  return (
    <RequireAuth role="learner" loginPath="/login">
      <AppLayout>{children}</AppLayout>
    </RequireAuth>
  );
}

function Admin({ children }: { children: ReactNode }) {
  return (
    <RequireAuth role="admin" loginPath="/admin/login">
      <AdminLayout>{children}</AdminLayout>
    </RequireAuth>
  );
}

function Employer({ children }: { children: ReactNode }) {
  return (
    <RequireAuth role="employer" loginPath="/employer/login">
      <EmployerLayout>{children}</EmployerLayout>
    </RequireAuth>
  );
}

function Routes() {
  return (
    <Switch>
      {/* Auth (learner) */}
      <Route path="/login">
        <AuthLayout>
          <LearnerLogin />
        </AuthLayout>
      </Route>
      <Route path="/register">
        <AuthLayout>
          <Register />
        </AuthLayout>
      </Route>

      {/* Admin login (no dashboard chrome) */}
      <Route path="/admin/login" component={AdminLogin} />
      {/* Employer login (no dashboard chrome) */}
      <Route path="/employer/login" component={EmployerLogin} />

      {/* Learner app (gated) */}
      <Route path="/dashboard">
        <Learner>
          <Dashboard />
        </Learner>
      </Route>
      <Route path="/dashboard/courses">
        <Learner>
          <DashCourses />
        </Learner>
      </Route>
      <Route path="/dashboard/courses/:slug/quiz/:quizId">
        <Learner>
          <DashQuiz />
        </Learner>
      </Route>
      <Route path="/dashboard/courses/:slug/:lessonId">
        <Learner>
          <DashLesson />
        </Learner>
      </Route>
      <Route path="/dashboard/courses/:slug">
        <Learner>
          <DashCourseDetail />
        </Learner>
      </Route>
      <Route path="/dashboard/certificates">
        <Learner>
          <Certificates />
        </Learner>
      </Route>

      {/* Admin (gated) */}
      <Route path="/admin">
        <Admin>
          <AdminHome />
        </Admin>
      </Route>
      <Route path="/admin/applications">
        <Admin>
          <AdminApplications />
        </Admin>
      </Route>
      <Route path="/admin/applications/:id">
        <Admin>
          <AdminApplicationDetail />
        </Admin>
      </Route>
      <Route path="/admin/placements">
        <Admin>
          <AdminPlacements />
        </Admin>
      </Route>
      <Route path="/admin/sponsors">
        <Admin>
          <AdminSponsors />
        </Admin>
      </Route>

      {/* Employer (gated) */}
      <Route path="/employer">
        <Employer>
          <EmployerHome />
        </Employer>
      </Route>
      <Route path="/employer/talent">
        <Employer>
          <EmployerTalent />
        </Employer>
      </Route>
      <Route path="/employer/talent/:id">
        <Employer>
          <EmployerTalentDetail />
        </Employer>
      </Route>
      <Route path="/employer/pipeline">
        <Employer>
          <EmployerPipeline />
        </Employer>
      </Route>
      <Route path="/employer/placements">
        <Employer>
          <EmployerPlacements />
        </Employer>
      </Route>
      <Route path="/employer/roles">
        <Employer>
          <EmployerRoles />
        </Employer>
      </Route>

      {/* Marketing */}
      <Route path="/">
        <Marketing>
          <Home />
        </Marketing>
      </Route>
      <Route path="/about">
        <Marketing>
          <About />
        </Marketing>
      </Route>
      <Route path="/apply">
        <Marketing>
          <Apply />
        </Marketing>
      </Route>
      <Route path="/contact">
        <Marketing>
          <Contact />
        </Marketing>
      </Route>
      <Route path="/courses">
        <Marketing>
          <Courses />
        </Marketing>
      </Route>
      <Route path="/courses/:slug">
        <Marketing>
          <CourseDetail />
        </Marketing>
      </Route>
      <Route path="/employers">
        <Marketing>
          <Employers />
        </Marketing>
      </Route>
      <Route path="/funded-training">
        <Marketing>
          <FundedTraining />
        </Marketing>
      </Route>
      <Route path="/sponsors">
        <Marketing>
          <Sponsors />
        </Marketing>
      </Route>
      <Route path="/privacy">
        <Marketing>
          <Privacy />
        </Marketing>
      </Route>
      <Route path="/terms">
        <Marketing>
          <Terms />
        </Marketing>
      </Route>
      <Route path="/verify/:id">
        <Marketing>
          <Verify />
        </Marketing>
      </Route>

      <Route>
        <Marketing>
          <NotFound />
        </Marketing>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <RootLayout>
              <Routes />
            </RootLayout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
