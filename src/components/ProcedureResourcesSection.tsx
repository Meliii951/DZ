
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Download, FileText, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import { SectionHeader } from './common/SectionHeader';

export function ProcedureResourcesSection() {
  // État pour la modale de visualisation de guide
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideTitle, setGuideTitle] = useState<string|null>(null);

  // Ouvre la modale de visualisation de guide
  const handleConsultGuide = (title: string) => {
    setGuideTitle(title);
    setShowGuideModal(true);
  };

  // Déclenche un vrai téléchargement ZIP (fichier statique ou généré dynamiquement)
  const handleDownloadForms = (categoryTitle: string) => {
    const fileName = `${categoryTitle.toLowerCase().replace(/\s+/g, '_')}_forms.zip`;
    // Pour la démo, on utilise un fichier statique dans public/forms/
    const fileUrl = `/forms/${fileName}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Données des guides pratiques
  const guides = [
    {
      id: 1,
      title: "Guide création d'entreprise",
      description: "Guide complet pour créer votre entreprise en Algérie",
      updateDate: "15/03/2024",
      badge: "Populaire",
      features: [
        "Étapes détaillées de création",
        "Documents requis",
        "Délais et coûts"
      ]
    },
    {
      id: 2,
      title: "Procédures d'état civil",
      description: "Démarches pour actes d'état civil et extraits",
      updateDate: "10/03/2024",
      badge: null,
      features: [
        "Actes de naissance/mariage",
        "Extraits d'état civil",
        "Légalisation documents"
      ]
    },
    {
      id: 3,
      title: "Permis et autorisations",
      description: "Guide pour obtenir permis et autorisations diverses",
      updateDate: "08/03/2024",
      badge: null,
      features: [
        "Permis de construire",
        "Licences commerciales",
        "Autorisations spéciales"
      ]
    },
    {
      id: 4,
      title: "Procédures fiscales",
      description: "Démarches fiscales et déclarations obligatoires",
      updateDate: "05/03/2024",
      badge: null,
      features: [
        "Déclarations fiscales",
        "Numéro d'identification",
        "Exonérations et régimes"
      ]
    },
    {
      id: 5,
      title: "Procédures douanières",
      description: "Import/export et démarches douanières",
      updateDate: "02/03/2024",
      badge: null,
      features: [
        "Déclarations douanières",
        "Régimes suspensifs",
        "Franchise et exemptions"
      ]
    },
    {
      id: 6,
      title: "Procédures sociales",
      description: "Sécurité sociale et protection sociale",
      updateDate: "28/02/2024",
      badge: "Nouveau",
      features: [
        "Affiliation sécurité sociale",
        "Prestations familiales",
        "Retraite et invalidité"
      ]
    },
    {
      id: 7,
      title: "Procédures d'urbanisme",
      description: "Aménagement et construction",
      updateDate: "25/02/2024",
      badge: null,
      features: [
        "Certificats d'urbanisme",
        "Permis de construire",
        "Lotissements et divisions"
      ]
    },
    {
      id: 8,
      title: "Procédures environnementales",
      description: "Protection de l'environnement",
      updateDate: "22/02/2024",
      badge: null,
      features: [
        "Études d'impact",
        "Autorisations environnementales",
        "Gestion des déchets"
      ]
    },
    {
      id: 9,
      title: "Procédures de santé",
      description: "Santé publique et médicale",
      updateDate: "20/02/2024",
      badge: null,
      features: [
        "Autorisations médicales",
        "Certificats de santé",
        "Protocoles sanitaires"
      ]
    },
    {
      id: 10,
      title: "Procédures d'éducation",
      description: "Système éducatif et formation",
      updateDate: "18/02/2024",
      badge: null,
      features: [
        "Inscriptions scolaires",
        "Équivalences diplômes",
        "Formation continue"
      ]
    },
    {
      id: 11,
      title: "Procédures de transport",
      description: "Transport et mobilité",
      updateDate: "15/02/2024",
      badge: null,
      features: [
        "Permis de conduire",
        "Immatriculation véhicules",
        "Transports publics"
      ]
    },
    {
      id: 12,
      title: "Procédures de justice",
      description: "Accès à la justice",
      updateDate: "12/02/2024",
      badge: null,
      features: [
        "Assistance juridique",
        "Procédures judiciaires",
        "Médiation et conciliation"
      ]
    }
  ];

  // Données des formulaires téléchargeables
  const forms = [
    {
      id: 1,
      title: "Formulaires création entreprise",
      description: "Ensemble des formulaires pour créer une entreprise",
      category: "Commercial",
      fileSize: "2.3 MB",
      downloads: 1247
    },
    {
      id: 2,
      title: "Formulaires état civil",
      description: "Formulaires pour actes d'état civil",
      category: "Administratif",
      fileSize: "1.8 MB",
      downloads: 892
    },
    {
      id: 3,
      title: "Formulaires fiscaux",
      description: "Déclarations et formulaires fiscaux",
      category: "Fiscal",
      fileSize: "3.1 MB",
      downloads: 1567
    },
    {
      id: 4,
      title: "Formulaires douaniers",
      description: "Formulaires import/export",
      category: "Douane",
      fileSize: "2.7 MB",
      downloads: 734
    },
    {
      id: 5,
      title: "Formulaires sociaux",
      description: "Formulaires sécurité sociale",
      category: "Social",
      fileSize: "1.5 MB",
      downloads: 445
    },
    {
      id: 6,
      title: "Formulaires urbanisme",
      description: "Formulaires construction et aménagement",
      category: "Urbanisme",
      fileSize: "2.1 MB",
      downloads: 678
    },
    {
      id: 7,
      title: "Formulaires environnement",
      description: "Formulaires protection environnement",
      category: "Environnement",
      fileSize: "1.9 MB",
      downloads: 234
    },
    {
      id: 8,
      title: "Formulaires santé",
      description: "Formulaires santé publique",
      category: "Santé",
      fileSize: "1.2 MB",
      downloads: 567
    },
    {
      id: 9,
      title: "Formulaires éducation",
      description: "Formulaires système éducatif",
      category: "Éducation",
      fileSize: "1.6 MB",
      downloads: 789
    },
    {
      id: 10,
      title: "Formulaires transport",
      description: "Formulaires transport et mobilité",
      category: "Transport",
      fileSize: "2.4 MB",
      downloads: 456
    },
    {
      id: 11,
      title: "Formulaires justice",
      description: "Formulaires accès à la justice",
      category: "Justice",
      fileSize: "1.7 MB",
      downloads: 123
    },
    {
      id: 12,
      title: "Formulaires divers",
      description: "Autres formulaires administratifs",
      category: "Divers",
      fileSize: "2.8 MB",
      downloads: 345
    }
  ];

  // Pagination pour les guides pratiques
  const {
    currentData: paginatedGuides,
    currentPage: guidesCurrentPage,
    totalPages: guidesTotalPages,
    itemsPerPage: guidesItemsPerPage,
    totalItems: guidesTotalItems,
    setCurrentPage: setGuidesCurrentPage,
    setItemsPerPage: setGuidesItemsPerPage
  } = usePagination({
    data: guides,
    itemsPerPage: 10
  });

  // Pagination pour les formulaires
  const {
    currentData: paginatedForms,
    currentPage: formsCurrentPage,
    totalPages: formsTotalPages,
    itemsPerPage: formsItemsPerPage,
    totalItems: formsTotalItems,
    setCurrentPage: setFormsCurrentPage,
    setItemsPerPage: setFormsItemsPerPage
  } = usePagination({
    data: forms,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      {/* Modale de visualisation de guide */}
      {showGuideModal && guideTitle && (
        <DocumentViewerModal
          isOpen={showGuideModal}
          onClose={() => setShowGuideModal(false)}
          document={{
            title: guideTitle,
            content: `Ici s'affiche le guide pratique : ${guideTitle}. (À remplacer par le vrai contenu métier du guide)`
          }}
        />
      )}
      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Guides pratiques
          </TabsTrigger>
          <TabsTrigger value="formulaires" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Formulaires Téléchargeables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{guide.title}</CardTitle>
                      {guide.badge && (
                        <Badge variant="outline" className="text-xs">{guide.badge}</Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      Mis à jour le {guide.updateDate}
                    </div>
                    <div className="space-y-2">
                      {guide.features.map((feature, index) => (
                        <p key={index} className="text-xs text-gray-600">• {feature}</p>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleConsultGuide(guide.title)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Consulter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination pour les guides */}
            <Pagination
              currentPage={guidesCurrentPage}
              totalPages={guidesTotalPages}
              totalItems={guidesTotalItems}
              itemsPerPage={guidesItemsPerPage}
              onPageChange={setGuidesCurrentPage}
              onItemsPerPageChange={setGuidesItemsPerPage}
            />
          </div>
        </TabsContent>



            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Permis et autorisations</CardTitle>
                <CardDescription className="text-sm">
                  Guide pour obtenir permis et autorisations diverses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Mis à jour le 08/03/2024
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Permis de construire</p>
                  <p className="text-xs text-gray-600">• Licences commerciales</p>
                  <p className="text-xs text-gray-600">• Autorisations spéciales</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConsultGuide("Permis et autorisations")}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Consulter
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Procédures fiscales</CardTitle>
                <CardDescription className="text-sm">
                  Démarches fiscales et déclarations obligatoires
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Mis à jour le 05/03/2024
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Déclarations fiscales</p>
                  <p className="text-xs text-gray-600">• Numéro d'identification</p>
                  <p className="text-xs text-gray-600">• Exonérations et régimes</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConsultGuide("Procédures fiscales")}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Consulter
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Procédures douanières</CardTitle>
                <CardDescription className="text-sm">
                  Import/export et démarches douanières
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Mis à jour le 02/03/2024
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Déclarations douanières</p>
                  <p className="text-xs text-gray-600">• Régimes suspensifs</p>
                  <p className="text-xs text-gray-600">• Franchise et exemptions</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConsultGuide("Procédures douanières")}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Consulter
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Sécurité sociale</CardTitle>
                <CardDescription className="text-sm">
                  Affiliation et prestations de sécurité sociale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Mis à jour le 28/02/2024
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Affiliation employeurs</p>
                  <p className="text-xs text-gray-600">• Carte Chifa</p>
                  <p className="text-xs text-gray-600">• Prestations familiales</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleConsultGuide("Sécurité sociale")}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Consulter
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="formulaires" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedForms.map((form) => (
                <Card key={form.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{form.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{form.category}</Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {form.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Taille: {form.fileSize}</span>
                        <span>{form.downloads} téléchargements</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDownloadForms(form.title)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger (ZIP)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination pour les formulaires */}
            <Pagination
              currentPage={formsCurrentPage}
              totalPages={formsTotalPages}
              totalItems={formsTotalItems}
              itemsPerPage={formsItemsPerPage}
              onPageChange={setFormsCurrentPage}
              onItemsPerPageChange={setFormsItemsPerPage}
            />
          </div>
        </TabsContent>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">État civil</CardTitle>
                  <Badge variant="secondary" className="text-xs">8 docs</Badge>
                </div>
                <CardDescription className="text-sm">
                  Demandes d'actes et extraits d'état civil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Demande acte de naissance</p>
                  <p className="text-xs text-gray-600">• Extrait d'état civil</p>
                  <p className="text-xs text-gray-600">• Certificat de vie</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleDownloadForms("État civil")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger (ZIP)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">Permis et licences</CardTitle>
                  <Badge variant="secondary" className="text-xs">12 docs</Badge>
                </div>
                <CardDescription className="text-sm">
                  Demandes de permis et autorisations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Permis de construire</p>
                  <p className="text-xs text-gray-600">• Licence d'importation</p>
                  <p className="text-xs text-gray-600">• Autorisation d'exercice</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleDownloadForms("Permis et licences")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger (ZIP)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">Fiscalité</CardTitle>
                  <Badge variant="secondary" className="text-xs">10 docs</Badge>
                </div>
                <CardDescription className="text-sm">
                  Formulaires fiscaux et déclarations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Déclaration annuelle</p>
                  <p className="text-xs text-gray-600">• Demande NIF</p>
                  <p className="text-xs text-gray-600">• Exonération fiscale</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleDownloadForms("Fiscalité")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger (ZIP)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">Douanes</CardTitle>
                  <Badge variant="secondary" className="text-xs">6 docs</Badge>
                </div>
                <CardDescription className="text-sm">
                  Déclarations et formulaires douaniers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Déclaration import/export</p>
                  <p className="text-xs text-gray-600">• Demande agrément</p>
                  <p className="text-xs text-gray-600">• Franchise temporaire</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleDownloadForms("Douanes")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger (ZIP)
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">Protection sociale</CardTitle>
                  <Badge variant="secondary" className="text-xs">9 docs</Badge>
                </div>
                <CardDescription className="text-sm">
                  Formulaires CNAS, CNR et mutuelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">• Affiliation CNAS</p>
                  <p className="text-xs text-gray-600">• Demande Carte Chifa</p>
                  <p className="text-xs text-gray-600">• Allocations familiales</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleDownloadForms("Protection sociale")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Télécharger (ZIP)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
