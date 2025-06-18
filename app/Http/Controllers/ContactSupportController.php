<?php

namespace App\Http\Controllers;

use App\Models\ContactForm;
use App\Models\SupportHotline;
use App\Models\SocialMediaLink;
use App\Models\FaqItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ContactSupportController extends Controller
{
    /**
     * Get all Contact & Support section data
     */
    public function index(): JsonResponse
    {
        try {
            $data = [
                'hotlines' => SupportHotline::active()->ordered()->get(),
                'social_media' => SocialMediaLink::active()->ordered()->get(),
                'featured_faqs' => FaqItem::active()->featured()->ordered()->get(),
                'faq_categories' => $this->getFaqCategories(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Contact & Support data retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve Contact & Support data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit contact form
     */
    public function submitContactForm(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'subject' => 'required|string|max:255',
                'message' => 'required|string|max:2000',
            ]);

            $contactForm = ContactForm::create($validated);

            return response()->json([
                'success' => true,
                'data' => $contactForm,
                'message' => 'Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data yang dikirim tidak valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengirim pesan. Silakan coba lagi.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get support hotlines
     */
    public function getHotlines(): JsonResponse
    {
        try {
            $hotlines = SupportHotline::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $hotlines,
                'message' => 'Support hotlines retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve support hotlines',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get social media links
     */
    public function getSocialMediaLinks(): JsonResponse
    {
        try {
            $socialMedia = SocialMediaLink::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $socialMedia,
                'message' => 'Social media links retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve social media links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get FAQ items
     */
    public function getFaqs(Request $request): JsonResponse
    {
        try {
            $query = FaqItem::active()->ordered();

            // Filter by category if provided
            if ($request->has('category') && $request->category !== 'all') {
                $query->byCategory($request->category);
            }

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $query->search($request->search);
            }

            // Featured only
            if ($request->boolean('featured_only')) {
                $query->featured();
            }

            $faqs = $query->get();

            return response()->json([
                'success' => true,
                'data' => $faqs,
                'message' => 'FAQ items retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve FAQ items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get FAQ categories
     */
    public function getFaqCategories(): array
    {
        return [
            'general' => 'Umum',
            'booking' => 'Booking',
            'payment' => 'Pembayaran',
            'property' => 'Properti',
            'account' => 'Akun',
            'technical' => 'Teknis',
        ];
    }

    /**
     * Increment FAQ view count
     */
    public function incrementFaqView(Request $request, $id): JsonResponse
    {
        try {
            $faq = FaqItem::findOrFail($id);
            $faq->incrementViewCount();

            return response()->json([
                'success' => true,
                'message' => 'FAQ view count updated'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update FAQ view count',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
