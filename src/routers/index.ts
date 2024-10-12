
import { Router } from "express";
import httpStatus from "http-status";

const router = Router();

/**
 * Public Routes
 */

router.all('/health-check', (req, res) => {
    return res.status(httpStatus.OK).json({
        message: "Server alive and running"
    })
});

export default router;
