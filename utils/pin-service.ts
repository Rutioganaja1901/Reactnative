// utils/pin-service.ts
let pinStorage: string | null = null;

export const PinService = {
  async setPin(pin: string): Promise<void> {
    try {
      pinStorage = pin;
      console.log('✅ PIN set successfully:', pin);
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Error saving PIN:', error);
      throw error;
    }
  },

  async getPin(): Promise<string | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return pinStorage;
  },

  async hasPin(): Promise<boolean> {
    const pin = await this.getPin();
    return pin !== null && pin.length >= 4;
  },

  async verifyPin(pin: string): Promise<boolean> {
    const storedPin = await this.getPin();
    return storedPin === pin;
  },

  async clearPin(): Promise<void> {
    try {
      pinStorage = null;
      console.log('✅ PIN cleared');
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error('Error clearing PIN:', error);
    }
  },
};

