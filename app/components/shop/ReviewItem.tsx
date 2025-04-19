import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HiDotsVertical } from "react-icons/hi";
import { Rating } from "@smastrom/react-rating";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import { ReviewProps } from "@/app/utils/types/app";
import toast from "react-hot-toast";
import { deleteReview, updateReview } from "@/app/utils/api/Review";

type propsType = {
  userId: string;
  review: ReviewProps;
};

const ReviewItem = ({ review, userId }: propsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(review);
  const token = getTokenClient();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await deleteReview(reviewId, token as string);
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEdit = async () => {
    try {
      await updateReview(Number(review.reviewID), editedReview, token as string);
      toast.success("Review updated successfully!");
    } catch {
      toast.error("Failed to update review. Please try again.");
    } finally {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div key={review.reviewID} className="review-item p-5 bg-white shadow-sm rounded-2xl mb-4">
      {/* User Info */}
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-semibold text-gray-900 text-lg">{review.firstName + " " + review.lastName}</h4>
          <span className="text-sm text-green">{review.reviewDate.slice(0, 10)}</span>
        </div>
        {review.userID === userId && (
          <div className="controls relative">
            <button onClick={toggleMenu} className="p-1 hover:bg-gray-100 rounded">
              <HiDotsVertical size={18} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setEditedReview(review);
                    setIsMenuOpen(false);
                    setIsEditDialogOpen(true);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rating & Headline */}
      <div className="mt-4">
        <Rating value={review.rating} readOnly style={{ maxWidth: 100 }} />
        <h4 className="font-semibold text-lg text-gray-900 mb-1 font-[cairo]">{review.headline}</h4>
        {/* Review Text */}
        <p className="text-gray-700 text-base leading-relaxed mt-1 font-[cairo]">{review.reviewText}</p>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={editedReview.headline} onChange={(e) => setEditedReview({ ...editedReview, headline: e.target.value })} placeholder="Headline" />
            <Textarea value={editedReview.reviewText} onChange={(e) => setEditedReview({ ...editedReview, reviewText: e.target.value })} placeholder="Review Text" />
            <Rating value={editedReview.rating} onChange={(value: number) => setEditedReview({ ...editedReview, rating: value })} style={{ maxWidth: 100 }} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete the review.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(Number(review.reviewID))}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewItem;
