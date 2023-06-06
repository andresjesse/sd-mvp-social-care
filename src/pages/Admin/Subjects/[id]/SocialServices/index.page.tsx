import React from "react";

import { Button, Card, Title } from "@mantine/core";

import { useNavigate, useParams } from "react-router-dom";

import useCollection from "@/hooks/useCollection";
import useDocument from "@/hooks/useDocument";

import { Subject } from "@/types/Subject";
import { SocialService } from "@/types/SocialService";

import AppLayout from "@/pages/Layouts/AppLayout";

import i18n from "@/lang";
import PageSkeleton from "./_PageSkeleton";
import SocialServicesAccordion from "./_SocialServicesAccordion";

export default function AdminSocialServicesPage() {
  const navigate = useNavigate();

  const { subjectId } = useParams();

  const { data: socialServices, loading: loadingSocialServices } =
    useCollection<SocialService>(`subjects/${subjectId}/social-services`);

  const { data: subject, loading: loadingSubject } = useDocument<Subject>(
    "subjects",
    subjectId || ""
  );

  const showSkeleton = loadingSubject || loadingSocialServices;

  return (
    <AppLayout navbarLinkActive={"social-services"}>
      {showSkeleton ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>
            {i18n.t("social_services_page.title")} {subject?.name}
          </Title>

          <Button
            mt="md"
            onClick={() => {
              navigate("create");
            }}
          >
            {i18n.t("social_services_page.create")}
          </Button>

          {socialServices.length > 0 && (
            <SocialServicesAccordion socialServices={socialServices} />
          )}
        </Card>
      )}
    </AppLayout>
  );
}
