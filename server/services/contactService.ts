export interface ContactLead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

export class ContactService {
  // In-memory persistent queue of submitted inquiries for audit and telemetry
  private leads: ContactLead[] = [];
  private readonly maxLeadsStored = 200;

  /**
   * Processes, verifies, and registers a new incoming contact inquiry
   */
  public async submitInquiry(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot?: string;
    ip?: string;
    userAgent?: string;
  }): Promise<{ id: string; receivedAt: string }> {
    // Anti-spam honeypot detection: If hidden honeypot field is filled, silently discard spam
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.warn(`[Anti-Spam] Bot detected via honeypot field from IP ${data.ip || "unknown"}`);
      return {
        id: `spm_${Date.now()}`,
        receivedAt: new Date().toISOString(),
      };
    }

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newLead: ContactLead = {
      id: leadId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      ip: data.ip,
      userAgent: data.userAgent,
      createdAt: now,
    };

    this.leads.unshift(newLead);
    if (this.leads.length > this.maxLeadsStored) {
      this.leads.pop();
    }

    console.log(`[ContactService] Successfully registered priority lead ${leadId} from ${newLead.email} ("${newLead.subject}")`);

    return {
      id: leadId,
      receivedAt: now,
    };
  }

  /**
   * Retrieves summary count of registered leads for health metrics
   */
  public getLeadsCount(): number {
    return this.leads.length;
  }
}

export const contactService = new ContactService();
