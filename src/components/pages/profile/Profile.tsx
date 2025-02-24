'use client';

import { Eye, Loader2, Star, ThumbsUp, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATHS } from '@/constants/PATHS';
import { useGetReviews } from '@/hooks/useReviews';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('Profile');
  const [activeTab, setActiveTab] = useState('overview');
  const { data: userReviews, isPending } = useGetReviews({
    userId: session?.user.id,
  });

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push(PATHS.SIGNIN.ROOT);
    return null;
  }

  const userStats = {
    reviewsWritten: userReviews?.data.content.length,
    reviewsRead: 0, // This would be fetched from the backend in a real app
    helpfulVotes: 0, // This would be fetched from the backend in a real app
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={session?.user.image || undefined}
                alt={session?.user.name || ''}
              />
              <AvatarFallback>
                {session?.user.name?.charAt(0) || (
                  <User className="h-10 w-10" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{session?.user.name}</CardTitle>
              <CardDescription>{session?.user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('reviewsWritten')}
                    </CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStats.reviewsWritten}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('reviewsRead')}
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStats.reviewsRead}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('helpfulVotes')}
                    </CardTitle>
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userStats.helpfulVotes}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              {isPending ? (
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : userReviews?.data.content.length ? (
                <div className="space-y-4">
                  {userReviews?.data.content.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <CardTitle>{review.title}</CardTitle>
                        <CardDescription>
                          {new Date(review.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{review.content}</p>
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                          <span>{review.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>{t('noReviews')}</p>
              )}
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            <Button variant="destructive" onClick={() => signOut()}>
              {t('signOut')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
