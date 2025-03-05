export const BusinessResponseExamples = {
  create: {
    status: 201,
    description: 'The business has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: "John's Salon",
        description: 'A premium beauty salon',
        segment: 'BEAUTY',
        taxId: '12345678901234',
        email: 'contact@johnsalon.com',
        phone: '+5511999999999',
        website: 'www.johnsalon.com',
        address: {
          street: 'Beauty Street',
          number: '123',
          complement: 'Floor 2',
          neighborhood: 'Downtown',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
        social: {
          instagram: '@johnsalon',
          whatsapp: '+5511999999999',
          facebook: 'johnsalonofficial',
          googleMyBusiness: "John's Salon",
        },
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  findAll: {
    status: 200,
    description: 'Return all businesses.',
    schema: {
      example: [
        {
          id: 1,
          name: "John's Salon",
          description: 'A premium beauty salon',
          segment: 'BEAUTY',
          phone: '+5511999999999',
          createdAt: '2024-03-05T10:00:00Z',
          updatedAt: '2024-03-05T10:00:00Z',
        },
        {
          id: 2,
          name: "Mary's Spa",
          description: 'Relaxing spa services',
          segment: 'BEAUTY',
          phone: '+5511988888888',
          createdAt: '2024-03-05T11:00:00Z',
          updatedAt: '2024-03-05T11:00:00Z',
        },
      ],
    },
  },
  findOne: {
    status: 200,
    description: 'Return the business.',
    schema: {
      example: {
        id: 1,
        name: "John's Salon",
        description: 'A premium beauty salon',
        segment: 'BEAUTY',
        taxId: '12345678901234',
        email: 'contact@johnsalon.com',
        phone: '+5511999999999',
        website: 'www.johnsalon.com',
        address: {
          street: 'Beauty Street',
          number: '123',
          complement: 'Floor 2',
          neighborhood: 'Downtown',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
        social: {
          instagram: '@johnsalon',
          whatsapp: '+5511999999999',
          facebook: 'johnsalonofficial',
          googleMyBusiness: "John's Salon",
        },
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  update: {
    status: 200,
    description: 'The business has been successfully updated.',
    schema: {
      example: {
        id: 1,
        name: "John's Salon Updated",
        description: 'A premium beauty salon updated',
        segment: 'BEAUTY',
        updatedAt: '2024-03-05T12:00:00Z',
      },
    },
  },
  remove: {
    status: 200,
    description: 'The business has been successfully deleted.',
    schema: {
      example: {
        id: 1,
        name: "John's Salon",
        deleted: true,
      },
    },
  },
  notFound: {
    status: 404,
    description: 'Business not found.',
  },
  badRequest: {
    status: 400,
    description: 'Bad Request.',
  },
};
