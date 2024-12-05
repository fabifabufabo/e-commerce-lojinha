import Review from "../models/review.js";

class ReviewController {
    static async createReview(req, res, next) {
        try {
            const { id: productId } = req.params; 
            const { rating, comment } = req.body; 
            const userId = req.user.id;
            
            if (typeof rating !== "number" || rating < 1 || rating > 5) {
                return res.status(400).json({ error: "O campo rating deve ser um número entre 1 e 5." });
            }
            
            const existingReview = await Review.findOne({ userId, productId });
            if (existingReview) {
                return res.status(400).json({ error: "Você já avaliou este produto." });
            }

            const hasPurchased = await Order.exists({
                userId,
                products: { $elemMatch: { productId } },
            });
            if (!hasPurchased) {
                return res.status(403).json({ error: "Apenas quem comprou este produto pode avaliá-lo." });
            }

            const newReview = new Review({ userId, productId, rating, comment });
            await newReview.save();

            res.status(201).json(newReview);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar a review." });
        }
    }

    static async getReviewsByProduct(req, res, next) {
        try {
            const { id: productId } = req.params;
            let { page = 1, limit = 10 } = req.query;
    
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
            if (!Number.isInteger(page) || page <= 0 || !Number.isInteger(limit) || limit <= 0) {
                return res.status(400).json({ error: "Parâmetros de paginação devem ser números inteiros positivos." });
            }
    
            const [reviews, totalReviews] = await Promise.all([
                Review.find({ productId })
                    .populate("userId", "name")
                    .skip((page - 1) * limit)
                    .limit(limit),
                Review.countDocuments({ productId }),
            ]);
    
            res.status(200).json({
                total: totalReviews,
                page,
                pages: Math.ceil(totalReviews / limit),
                reviews,
            });
        } catch (error) {
            console.error("Erro ao obter reviews por produto:", error.message);
            res.status(500).json({ error: "Erro ao obter as reviews do produto. Tente novamente mais tarde." });
        }
    }
    
}

export default ReviewController;

