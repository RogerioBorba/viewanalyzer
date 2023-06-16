/*
Information about on-line sources from which the dataset, specification, 
or community profile name and extended metadata elements can be obtained.
*/
export class CI_OnlineResource  {
    constructor(metadataObject) {
        this.metadataObject = metadataObject
        this.description = ''
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
    linkage() {
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