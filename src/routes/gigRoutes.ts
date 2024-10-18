import express from 'express';
import {
  createGig,
  getGigById,
  updateGig,
  deleteGig,
  getGigs
} from '../controllers/gigControllers';

const router = express.Router();     


/**
 * @swagger
 * /api/gig/create-gig:
 *   post:
 *     summary: Create a new gig
 *     tags: [Gig]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gigTitle
 *               - gigDescription
 *               - gigCategoryId
 *               - creatorFullName
 *               - creatorPhoneNumber
 *               - creatorOfficeAddress
 *               - sellerPrice
 *               - basePrice
 *               - creatorId
 *               - creatorLocalGovermentArea
 *             properties:
 *               gigTitle:
 *                 type: string
 *                 example: Create catchy article
 *               gigDescription:
 *                 type: string
 *                 example: I will create your seo article
 *               gigCategoryId:
 *                 type: string
 *                 example: kkjjhg77yttuyuuu
 *               gigSubCategoryId:
 *                 type: string
 *                 example: kkjjhg77yttuyuuu
 *               creatorFullName:
 *                 type: string
 *                 example: John Doe
 *               sellerPrice:
 *                 type: string
 *                 example: 50000
 *               basePrice:
 *                 type: string
 *                 example: 30000
 *               creatorId:
 *                 type: string
 *                 example: 8877hhhyytt66
 *               creatorLocalGovermentArea:
 *                 type: string
 *                 example: Eti-Osa
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Gig created succesfully
 *       400:
 *         description: Missing properties
 *       409:
 *         description: Gig with that ID already exists
 *       500:
 *         description: Internal server error
 */
router.post('/create-gig', createGig);


/**
 * @swagger
 * /api/gig/{gigId}:
 *   get:
 *     summary: Get a gig by ID
 *     tags: [Gig]
 *     parameters:
 *       - in: path
 *         name: gigId
 *         required: true
 *         description: ID of the gig to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig retrieved successfully
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gigId', getGigById);

/**
 * @swagger
 * /api/gig/{gigId}:
 *   put:
 *     summary: Update a gig
 *     tags: [Gig]
 *     parameters:
 *       - in: path
 *         name: gigId
 *         required: true
 *         description: ID of the gig to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gig'
 *     responses:
 *       200:
 *         description: Gig updated successfully
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Internal server error
 */
router.put('/:gigId', updateGig);

/**
 * @swagger
 * /api/gig/{gigId}:
 *   delete:
 *     summary: Delete a gig
 *     tags: [Gig]
 *     parameters:
 *       - in: path
 *         name: gigId
 *         required: true
 *         description: ID of the gig to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gig deleted successfully
 *       404:
 *         description: Gig not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:gigId', deleteGig);

/**
 * @swagger
 * /api/gig/get-gigs:
 *   get:
 *     summary: Get gigs by various parameters
 *     tags: [Gig]
 *     parameters:
 *       - in: query
 *         name: creatorId
 *         required: false
 *         description: ID of the creator
 *         schema:
 *           type: string
 *       - in: query
 *         name: creatorLocalGovernmentArea
 *         required: false
 *         description: Local Government Area of the creator
 *         schema:
 *           type: string
 *       - in: query
 *         name: gigId
 *         required: false
 *         description: ID of the gig
 *         schema:
 *           type: string
 *       - in: query
 *         name: gigPrice
 *         required: false
 *         description: Price of the gig
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of gigs per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Gigs retrieved successfully
 *       404:
 *         description: No gigs found for the specified criteria
 *       500:
 *         description: Internal server error
 */
router.get('/get-gigs', getGigs);

export default router;
