<?php

namespace App\Http\Controllers;

use App\Models\CompanyBenefit;
use App\Models\TrustIndicator;
use App\Models\PlatformStatistic;
use App\Models\VerificationBadge;
use Illuminate\Http\JsonResponse;

class WhyChooseUsController extends Controller
{
    /**
     * Get all Why Choose Us section data
     */
    public function index(): JsonResponse
    {
        try {
            $data = [
                'benefits' => CompanyBenefit::active()->ordered()->get(),
                'trust_indicators' => TrustIndicator::active()->ordered()->get(),
                'statistics' => PlatformStatistic::active()->ordered()->get(),
                'verification_badges' => VerificationBadge::active()->ordered()->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Why Choose Us data retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve Why Choose Us data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get company benefits
     */
    public function getBenefits(): JsonResponse
    {
        try {
            $benefits = CompanyBenefit::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $benefits,
                'message' => 'Company benefits retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve company benefits',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get trust indicators
     */
    public function getTrustIndicators(): JsonResponse
    {
        try {
            $trustIndicators = TrustIndicator::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $trustIndicators,
                'message' => 'Trust indicators retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve trust indicators',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get platform statistics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $statistics = PlatformStatistic::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $statistics,
                'message' => 'Platform statistics retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve platform statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get verification badges
     */
    public function getVerificationBadges(): JsonResponse
    {
        try {
            $badges = VerificationBadge::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $badges,
                'message' => 'Verification badges retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve verification badges',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
