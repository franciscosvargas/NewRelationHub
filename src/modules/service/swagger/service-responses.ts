export const ServiceResponseExamples = {
  createService: {
    status: 201,
    description: 'Service created successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Haircut',
        description: 'Professional haircut service',
        price: 50.0,
        duration: 30,
        businessId: 1,
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  findAllServices: {
    status: 200,
    description: 'Return all services.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Haircut',
          description: 'Professional haircut service',
          price: 50.0,
          duration: 30,
          businessId: 1,
          createdAt: '2024-03-05T10:00:00Z',
          updatedAt: '2024-03-05T10:00:00Z',
        },
        {
          id: 2,
          name: 'Hair Coloring',
          description: 'Professional hair coloring service',
          price: 120.0,
          duration: 90,
          businessId: 1,
          createdAt: '2024-03-05T11:00:00Z',
          updatedAt: '2024-03-05T11:00:00Z',
        },
      ],
    },
  },
  findServiceById: {
    status: 200,
    description: 'Return the service.',
    schema: {
      example: {
        id: 1,
        name: 'Haircut',
        description: 'Professional haircut service',
        price: 50.0,
        duration: 30,
        businessId: 1,
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  updateService: {
    status: 200,
    description: 'Service updated successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Haircut Deluxe',
        description: 'Premium haircut service',
        price: 65.0,
        duration: 45,
        businessId: 1,
        updatedAt: '2024-03-05T12:00:00Z',
      },
    },
  },
  deleteService: {
    status: 200,
    description: 'Service deleted successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Haircut',
        deleted: true,
      },
    },
  },
  createServiceCategory: {
    status: 201,
    description: 'Category created successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Hair Services',
        description: 'All hair-related services',
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  findAllServiceCategories: {
    status: 200,
    description: 'Return all categories.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Hair Services',
          description: 'All hair-related services',
          createdAt: '2024-03-05T10:00:00Z',
          updatedAt: '2024-03-05T10:00:00Z',
        },
        {
          id: 2,
          name: 'Nail Services',
          description: 'All nail-related services',
          createdAt: '2024-03-05T11:00:00Z',
          updatedAt: '2024-03-05T11:00:00Z',
        },
      ],
    },
  },
  findServiceCategoryById: {
    status: 200,
    description: 'Return the category.',
    schema: {
      example: {
        id: 1,
        name: 'Hair Services',
        description: 'All hair-related services',
        createdAt: '2024-03-05T10:00:00Z',
        updatedAt: '2024-03-05T10:00:00Z',
      },
    },
  },
  updateServiceCategory: {
    status: 200,
    description: 'Category updated successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Premium Hair Services',
        description: 'All premium hair-related services',
        updatedAt: '2024-03-05T12:00:00Z',
      },
    },
  },
  deleteServiceCategory: {
    status: 200,
    description: 'Category deleted successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Hair Services',
        deleted: true,
      },
    },
  },
  addCategoryToService: {
    status: 201,
    description: 'Category added to service successfully.',
    schema: {
      example: {
        message: 'Category successfully added to service',
      },
    },
  },
  removeCategoryFromService: {
    status: 200,
    description: 'Category removed from service successfully.',
    schema: {
      example: {
        message: 'Category successfully removed from service',
      },
    },
  },
  notFound: {
    status: 404,
    description: 'Not found.',
  },
  badRequest: {
    status: 400,
    description: 'Bad Request.',
  },
};
