export class Payment {
    paymentId?: number;
    userId?: number | null;
    tier?: string | null;
    price?: number;
    paymentType?: string;
    paymentFrequency?: string;
    paymentStatus?: string;
    membershipStatus?: string;
    membershipDate?: Date;
    createdAt?: Date;
    purchaseType?: string;
    updatedAt?: Date;


constructor(
        paymentId?: number,
        userId?: number,
        tier?: string,
        price?: number,
        paymentType?: string,
        paymentFrequency?: string,
        paymentStatus?: string,
        membershipStatus?: string,
        membershipDate?: Date,
        createdAt?: Date,
        updatedAt?: Date,
)
    {
        this.paymentId = paymentId;
        this.userId = userId;
        this.tier = tier;
        this.price = price;
        this.paymentType = paymentType;
        this.paymentFrequency = paymentFrequency;
        this.paymentStatus = paymentStatus;
        this.membershipStatus = membershipStatus;
        this.membershipDate = membershipDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }
}