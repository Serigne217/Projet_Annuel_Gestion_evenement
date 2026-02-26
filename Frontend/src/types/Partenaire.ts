export class Partenaire {
  id_partenaire: number;
  nom: string;
  type_activite: string;
  contact: string;
  adresse: string;

  constructor(
    id_partenaire: number,
    nom: string,
    type_activite: string,
    contact: string,
    adresse: string
  ) {
    this.id_partenaire = id_partenaire;
    this.nom = nom;
    this.type_activite = type_activite;
    this.contact = contact;
    this.adresse = adresse;
  }
}
