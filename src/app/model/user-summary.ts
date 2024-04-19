
export class UserSummary {
    firstname: string;
    lastname: string;
    countOfRejectedRequests: number;
    countOfAcceptedRequests: number;
    countOfPendingRequests: number;
    approvedTotal: number;
    rejectedTotal: number;

    constructor(
        firstname: string = '',
        lastname: string = '',
        countOfRejectedRequests: number = 0,
        countOfAcceptedRequests: number = 0,
        countOfPendingRequests: number = 0,
        approvedTotal: number = 0,
        rejectedTotal: number = 0,
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.countOfRejectedRequests = countOfRejectedRequests;
        this.countOfAcceptedRequests = countOfAcceptedRequests;
        this.countOfPendingRequests = countOfPendingRequests;
        this.approvedTotal = approvedTotal;
        this.rejectedTotal = rejectedTotal;
    }
}