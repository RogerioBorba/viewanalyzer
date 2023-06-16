// Source: https://www.geoapi.org/

import { Base } from "../Base";
import type { Identifier } from "../metadata/metadata";

export const DateTypeCode = {
    CREATION: "creation", //Date identifies when the resource was brought into existence.
    PUBLICATION: "publication",  //Date identifies when the resource was issued.
    REVISION: "revision", //Date identifies when the resource was examined or re-examined and improved or amended.
    EXPIRY: "expiry", //Date identifies when resource expires.
    LAST_UPDATE: "lastUpdate", //Date identifies when resource was last updated.
    LAST_REVISION: "lastRevision", //Date identifies when the resource was examined or re-examined and improved or amended.
    NEXT_UPDATE: "nextUpdate", //Date identifies when the resource will be next updated.
    UNAVAILABLE: "unavailable", //Date identifies when resource became not available or obtainable.
    IN_FORCE: "inForce", //Date identifies when resource became in force.
    ADOPTED: "adopted", // Date identifies when the resource was adopted.
    DEPRECATED: "deprecated", //Date identifies when the resource was deprecated.
    SUPERSEDED: "superseded",  //Date identifies when resource was superseded or replaced by another resource.
    VALIDITY_BEGINS: "validityBegins", //Time at which the data are considered to become valid.
    VALIDITY_EXPIRES: "validityExpires", //Time at which the data are no longer considered to be valid.
    RELEASED: "released", //The date that the resource shall be released for public access.
    DISTRIBUTION: "distribution" //Date identifies when an instance of the resource was distributed.
  };
  
export const OnLineFunctionCode = {
    DOWNLOAD: "download", //Online instructions for transferring data from one storage device or system to another.
    INFORMATION: "information", //Online information about the resource.
    OFFLINE_ACCESS: "offlineAccess", //Online instructions for requesting the resource from the provider.
    ORDER: "order", //Online order process for obtaining the resource.
    SEARCH: "search", //Online search interface for seeking out information about the resource.
    COMPLETE_METADATA: "completeMetadata", //Complete metadata provided.
    BROWSE_GRAPHIC: "browseGraphic", //Browse graphic provided.
    UPLOAD: "upload", //Online resource upload capability provided.
    EMAIL_SERVICE: "emailService", //Online email service provided.
    BROWSING: "browsing", //Online browsing provided.
    FILE_ACCESS: "fileAccess" //Online file access provided.
  };
  
export const PresentationFormCode = {
    DOCUMENT_DIGITAL: "documentDigital", //Digital representation of a primarily textual item (can contain illustrations also).
    DOCUMENT_HARDCOPY: "documentHardcopy",  //Representation of a primarily textual item (can contain illustrations also) on paper, photographic material, or other media.
    IMAGE_DIGITAL: "imageDigital", //Likeness of natural or man-made features, objects, and activities acquired through the sensing of visual or any other segment of the electromagnetic spectrum by sensors, such as thermal infrared, and high resolution radar and stored in digital format.
    IMAGE_HARDCOPY: "imageHardcopy", //Likeness of natural or man-made features, objects, and activities acquired through the sensing of visual or any other segment of the electromagnetic spectrum by sensors, such as thermal infrared, and high resolution radar and reproduced on paper, photographic material, or other media for use directly by the human user.
    MAP_DIGITAL: "mapDigital", //Map represented in raster or vector form.
    MAP_HARDCOPY: "mapHardcopy", //Map printed on paper, photographic material, or other media for use directly by the human user.
    MODEL_DIGITAL: "modelDigital", //Multi-dimensional digital representation of a feature, process, etc.
    MODEL_HARDCOPY: "modelHardcopy", //3-dimensional, physical model.
    PROFILE_DIGITAL: "profileDigital", //Vertical cross-section in digital form.
    PROFILE_HARDCOPY: "profileHardcopy", // Vertical cross-section printed on paper, etc.
    TABLE_DIGITAL: "tableDigital", // Digital representation of facts or figures systematically displayed, especially in columns.
    TABLE_HARDCOPY: "tableHardcopy", // Representation of facts or figures systematically displayed, especially in columns, printed on paper, photographic material, or other media.
    VIDEO_DIGITAL: "videoDigital", //Digital video recording.
    VIDEO_HARDCOPY: "videoHardcopy", // Video recording on film.
    AUDIO_DIGITAL: "audioDigital", ////Digital audio recording.
    AUDIO_HARDCOPY: "audioHardcopy", //Audio recording delivered by analog media, such as a magnetic tape
    MULTIMEDIA_DIGITAL: "multimediaDigital", //Information representation using simultaneously various digital modes for text, sound, image.
    MULTIMEDIA_HARDCOPY: "multimediaHardcopy", //Information representation using simultaneously various analog modes for text, sound, image.
    PHYSICAL_OBJECT: "physicalObject", //A physical object.
    DIAGRAM_DIGITAL: "diagramDigital", //Information represented graphically by charts such as pie chart, bar chart, and other type of diagrams and recorded in digital format.
    DIAGRAM_HARDCOPY: "diagramHardcopy"  //Information represented graphically by charts such as pie chart, bar chart, and other type of diagrams and printed on paper, photographic material, or other media.
  };
  
  
export const RoleCode = {
    RESOURCE_PROVIDER: "resourceProvider", //Party that supplies the resource.
    CUSTODIAN: "custodian", //Party that accepts accountability and responsibility for the data and ensures appropriate care and maintenance of the resource.
    OWNER: "owner", //Party that owns the resource.
    USER: "user", //Party who uses the resource.
    DISTRIBUTOR: "distributor", //Party who distributes the resource.
    ORIGINATOR: "originator", //Party who created the resource.
    POINT_OF_CONTACT: "pointOfContact", //Party who can be contacted for acquiring knowledge about or acquisition of the resource.
    PRINCIPAL_INVESTIGATOR: "principalInvestigator", //Key party responsible for gathering information and conducting research.
    PROCESSOR: "processor", //Party who has processed the data in a manner such that the resource has been modified.
    PUBLISHER: "publisher", //Party who published the resource.
    AUTHOR: "author", //Party who authored the resource.
    SPONSOR: "sponsor", //Party who speaks for the resource.
    CO_AUTHOR: "coAuthor", //Party who jointly authors the resource.
    COLLABORATOR: "collaborator", //Party who assists with the generation of the resource other than the principal investigator.
    EDITOR: "editor", //Party who reviewed or modified the resource to improve the content.
    MEDIATOR: "mediator", //A class of entity that immediate access to the resource and for whom the resource is intended or useful.
    RIGHTS_HOLDER: "rightsHolder", //Party owning or managing rights over the resource.
    CONTRIBUTOR: "contributor", //Party contributing to the resource.
    FUNDER: "funder", //Party providing monetary support for the resource.
    STAKEHOLDER: "stakeholder", //Party who has an interest in the resource or the use of the resource.
};
        
export const TelephoneTypeCode = {
    VOICE: "voice", //  Telephone provides voice service.
    FACSIMILE: "facsimile", //Telephone provides facsimile service.
    SMS: "sms" //Telephone provides SMS service.
};

// Information about the series, or aggregate resource, to which a resource belongs.


//Information about the series, or aggregate dataset, to which a dataset belongs.
export class Series extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }

    //Information identifying the issue of the series.
    getIssueIdentification(): string { return ''}

    //Name of the series, or aggregate dataset, of which the dataset is a part.
    getName(): string { return ''}

    //Details on which pages of the publication the article was published.
    getPage(): string { return ''}

}


export class CitationDate extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }

    //Reference date for the cited resource.
    getDate(): Date {
        
        return this.nodeValueFor("gmd:date", "gco:DateTime"); 
    }

    //Event used for reference date. DateType(CREATION, PUBLICATION, REVISION)
    getDateType(): string {
        return this.nodeValueFor("gmd:dateType", "gmd:CI_DateTypeCode"); 
    }
    
}


//Telephone numbers for contacting the responsible individual or organization.
export class Telefone extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }

    //Telephone numbers of a facsimile machine for the responsible organization or individual.
    getFacsimiles(): string[] {
        return []
    }

    //Telephone numbers by which individuals can speak to the responsible organization or individual.
    getVoices(): string[] {
        return []
    }
}


/*
Information about on-line sources from which the dataset, specification, 
or community profile name and extended metadata elements can be obtained.
*/
export class OnlineResource extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }

    //Name of an application profile that can be used with the online resource.
    getApplicationProfile(): string {
        return ''
    }

    //Detailed text description of what the online resource is/does.
    getDescription(): string {
        return ''
    }

    //Code for function performed by the online resource. OnLineFunction(DOWNLOAD, INFORMATION, OFFLINE_ACCESS, ORDER, SEARCH)
    getFunction(): string {
        return ''
    }

    //Location (address) for on-line access using a Uniform Resource Locator address or similar addressing scheme such as "http://www.statkart.no/isotc211"
    getLinkage(): string {
        return ''
    }

    //Name of the online resource.
    getName(): string {
        return ''
    }

    //Connection protocol to be used.
    getProtocol(): string {
        return ''
    }




}

export class Address extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }
    
    //State, province of the location.
    getAdministrativeArea(): string {
        let dt = this.data["gmd:administrativeArea"]["gmd:CI_UFCode"]["@attributes"].codeListValue
        if (dt)
            return dt

        return this.data["gmd:administrativeArea"]
    }
    
    //The city of the location.
    getCity(): string {
        return this.nodeValueFor("gmd:city","gco:CharacterString")
    }

    //Country of the physical address.    
    getCountry(): string {
        return this.nodeValueFor("gmd:country", "gco:CharacterString")
    }

    //Address line for the location (as described in ISO 11180, Annex A).
    getDeliveryPoints(): string[] {
        
        return this.nodeValueFor("gmd:deliveryPoint", "gco:CharacterString")
    }
    
    //Address of the electronic mailbox of the responsible organization or individual.
    getElectronicMailAddresses(): string[] {
        return []
    }

    //ZIP or other postal code.    
    getPostalCode(): string {
        return ''
    }
}


/*Information required to enable contact with the responsible person and/or organization.
*/
export class Contact extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }
    
    /*Physical and email address at which the organization or individual may be contacted.
    Deprecated. As of ISO 19115:2014, replaced by getAddresses().
    */
    getAddress(): Address {
        let dt = this.data["gmd:address"]["gmd:CI_Address"]
        return new Address(dt)
    }

    //Physical and email addresses at which the organization or individual may be contacted.
    getAddresses() {
        return []
    }

    
    //Supplemental instructions on how or when to contact the individual or organization.
    getContactInstructions(): string {
        return ''
    }

    //Time period (including time zone) when individuals can contact the organization or individual.
    getHoursOfService(): string {
        return ''
    }

    //On-line information that can be used to contact the individual or organization.
    getOnlineResource(): OnlineResource {
        return new OnlineResource()
    }

    //Telephone numbers at which the organization or individual may be contacted.
    getPhone(): Telefone {
        return new Telefone()
    }


}
/*Identification of, and means of communication with, person(s) and organizations associated with the dataset.
As of ISO 19115:2014, the ResponsibleParty type has been replaced by Responsibility to allow more flexible associations of individuals, organisations, and roles.
*/
export class ResponsibleParty extends Base {
    constructor(jsonXmlObject: Object) {
        super(jsonXmlObject)       
    }

    /*Address of the responsible party.
    Deprecated. As of ISO 19115:2014, replaced by Party.getContactInfo().
    */
    getContactInfo(): Contact {
        let dt = this.data["gmd:contactInfo"]["gmd:CI_Contact"]
        return new Contact(dt)
    }

    //Name of the responsible person- surname, given name, title separated by a delimiter.
    getIndividualName(): string {
        return ''
    }

    //Name of the responsible organization.
    getOrganisationName(): string {
        return this.nodeValueFor("gmd:organisationName", "gco:CharacterString")
    }

    //Role or position of the responsible person.
    getPositionName(): string {
        return ''
    }

    //Function performed by the responsible party. Role(AUTHOR, CUSTODIAN, DISTRIBUTOR, ORIGINATOR, OWNER...)
    getRole(): string {
        return this.nodeValue(this.data["gmd:role"]["gmd:CI_RoleCode"])
    }
}

export class Citation extends Base {
    constructor(jsonXmlObject: object) {
        super(jsonXmlObject)    
        
        //console.log("COSTRBUTOR: ", this.data)   
        //this.title = this.data["gmd:title"]["gmx:Anchor"]["#text"]
    }

    //Short name or other language name by which the cited information is known.
    getAlternateTitles() {
    }
    
    /*Name and position information for an individual or organization that is responsible for the resource.
     As of ISO 19115:2014, the ResponsibleParty type has been replaced by Responsibility to allow more flexible associations of individuals, organisations, and roles
    */
    getCitedResponsibleParties() {
        if (!this.data["gmd:citedResponsibleParty"])
            return undefined
        let colResponsibleParty = this.data["gmd:citedResponsibleParty"]["gmd:CI_ResponsibleParty"]
        if (Array.isArray(colResponsibleParty))
            return colResponsibleParty.map(obj => new ResponsibleParty(obj))
        else
            return [new ResponsibleParty(colResponsibleParty)]
        return colResponsibleParty
    }

    //Common title with holdings note.    
    getCollectiveTitle(){}

    //Reference date for the cited resource.
    getDates(): (CitationDate[]| undefined) {
        let dt = this.data["gmd:date"]["gmd:CI_Date"]
        if (dt) {
            if (Array.isArray(dt))
                return dt.map(obj => new CitationDate(obj))
            else
               return [new CitationDate(dt) ] 
        } else
            return undefined
    }

    //Version of the cited resource.    
    getEdition(): string {
        return ''
    }

    //Date of the edition, or null if none.
    getEditionDate(): Date {
        return new Date('')
    }

    //Unique identifier for the resource.
    getIdentifiers(): Identifier[] {
        return []
    }

    //International Standard Book Number, or null if none.
    getISBN(): string {
        return this.nodeValueFor("gmd:ISBN","gco:CharacterString")
    }

    //International Standard Serial Number, or null if none.
    getISSN(): string {
        return this.nodeValueFor("gmd:ISSN","gco:CharacterString")
    }
    
    //Other information required to complete the citation that is not recorded elsewhere.
    getOtherCitationDetails(): string {
        return ''

    }
    
    //Mode in which the resource is represented, or an empty string if none.
    //PresentationForm(DOCUMENT_DIGITAL, DOCUMENT_HARDCOPY, IMAGE_DIGITAL, IMAGE_HARDCOPY,MAP_DIGITAL...)
    getPresentationForms(): string{
        return ''
    }

    //Information about the series, or aggregate dataset, of which the dataset is a part.
    getSeries(): Series[] {
        return []
    }

    //Name by which the cited resource is known.
    getTitle(){ 
        return this.nodeValueFor("gmd:title","gco:CharacterString")
    }
}