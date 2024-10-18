import { Router } from 'express';
import { getAllServices, getServiceById, updateService, deleteService } from '../controllers/serviceCOntroller';

const router = Router();

/**
 * @swagger
 * /api/service/all-services:
 *   get:
 *     summary: Get all services with pagination
 *     tags: [Service]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of services to retrieve per page
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Services retrieved successfully
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalServices:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/all-services', getAllServices);

/**
 * @swagger
 * /api/service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service retrieved successfully
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getServiceById);

/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service updated successfully
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateService);

/**
 * @swagger
 * /api/service/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteService);

export default router;
