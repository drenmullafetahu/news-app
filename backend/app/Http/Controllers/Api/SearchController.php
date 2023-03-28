<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Models\UserCategories;
use App\Models\UserSources;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
   public function search(SearchRequest $request){

       $searchInput = $request->searchInput;
       $fromDateInput = $request->fromdateInput;
       $todDateInput = $request->todateInput;
       $source = $request->source;

       $news_api_key = env('NEWS_API_KEY');
       $guardian_key = env('GUARDIAN_API_KEY');
       $ny_times_key = env('NEW_YORK_TIMES_API_KEY');

       $news_api_url = 'https://newsapi.org/v2/everything';
       $guardian_url = 'https://content.guardianapis.com/search';
       $ny_times_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
       $httpClient = new \GuzzleHttp\Client();

       if($searchInput !== null){
           if($source == 'news_api'){
               $request = $httpClient->get("${news_api_url}?q=${searchInput}&from=${fromDateInput}&to=${todDateInput}&pageSize=20&apiKey=${news_api_key}");
           }else if ($source == 'guardian'){
               if($fromDateInput && $todDateInput){
                   $request = $httpClient->get("${guardian_url}?q=${searchInput}&from-date=${fromDateInput}&to-date=${todDateInput}&pageSize=20&api-key=${guardian_key}");
               }else{
                   $request = $httpClient->get("${guardian_url}?q=${searchInput}&pageSize=20&api-key=${guardian_key}");
               }
           }else if($source == 'new_york_times'){
               if($fromDateInput && $todDateInput){
                   $fromDateTimestamp = trim($fromDateInput, "-");
                   $toDateTimestamp = trim($todDateInput, "-");
                   $request = $httpClient->get("${ny_times_url}?q=${searchInput}&begin_date=${fromDateTimestamp}&end_date=${toDateTimestamp}&api-key=${ny_times_key}");
               }else{
                   $request = $httpClient->get("${ny_times_url}?q=${searchInput}&api-key=${ny_times_key}");
                }
           }else{
               $request = $httpClient->get("${news_api_url}?q=${searchInput}&from=${fromDateInput}&to=${todDateInput}&pageSize=20&apiKey=${news_api_key}");
           }
           $response = json_decode($request->getBody()->getContents());

           return json_encode($response);
       }
       return response(compact('searchInput'));
   }

   public function getSources(SearchRequest $request){
       $httpClient = new \GuzzleHttp\Client();
       $sources_url = 'https://newsapi.org/v2/top-headlines/sources';
       $news_api_key = env('NEWS_API_KEY');
       $request =
           $httpClient
               ->get("${sources_url}?apiKey=${news_api_key}");
       $response = json_decode($request->getBody()->getContents());
       return json_encode($response);

   }
    public function getCategoryNews(SearchRequest $request){

        $httpClient = new \GuzzleHttp\Client();
        $top_headlines_url = 'https://newsapi.org/v2/top-headlines';
        $news_api_key = env('NEWS_API_KEY');
        $category_id = $request->category_id;

        if($category_id){
            $category_selection = UserCategories::where('category_id', $category_id)->where('user_id', Auth::id())->first();
            if(!$category_selection){
                UserCategories::create(
                    array(
                        'user_id' => Auth::id(),
                        'category_id' => $category_id
                    ));
            }else{
                $category_selection->delete();
            }
            $request =
                $httpClient
                    ->get("${top_headlines_url}?country=us&category=${category_id}&apiKey=${news_api_key}");

            $response = json_decode($request->getBody()->getContents());
            return json_encode($response);
        }
    }
    public function getSourceNews(SearchRequest $request){
        $httpClient = new \GuzzleHttp\Client();
        $top_headlines_url = 'https://newsapi.org/v2/top-headlines';
        $news_api_key = env('NEWS_API_KEY');
        $source_id = $request->source_id;
        if($source_id){
            $source_selection = UserSources::where('user_id', Auth::id())->first();
            if(!$source_selection){
                UserSources::create(
                    array(
                        'user_id' => Auth::id(),
                        'source_id' => $source_id
                    ));

            }else{
                $source_selection->update(['source_id' => $source_id]);
            }
            $request =
                $httpClient
                    ->get("${top_headlines_url}?sources=${source_id}&apiKey=${news_api_key}");

            $response = json_decode($request->getBody()->getContents());
            return json_encode($response);
        }
    }
    public function getSelectedCategories(Request $request){
       $user_id = Auth::id();
       $result = UserCategories::where('user_id', $user_id )->get();

        return json_encode(compact('result'));
    }
    public function getSelectedSources(Request $request){
        $user_id = Auth::id();
        $result = UserSources::where('user_id', $user_id )->get();

        return json_encode(compact('result'));
    }

}
