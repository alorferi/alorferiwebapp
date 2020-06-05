@extends('layouts.app')


@if (Auth::check())
    <script type="text/javascript">
        window.location = "{{ route('me.home') }}";//here double curly bracket
    </script>
@endif

@section('content')


    <div class="row p-2 mx-auto">

        <div class="col-sm-4">

            <img src="{{ url('/images/slider_imgs/img_02.png') }}" alt="Chicago" width="360px">
        </div>

        <div class="col-sm-4 text-center">

            <img src="{{asset('images/defaults/logo_large.png')}}" width="250" alt="Alor Feri logo">

            <h3 style="color:#0000A0;text-shadow: 1px 1px #ffffff;"><br/> এসো বই পড়ি <br/> আলোকিত সমাজ গড়ি।</h3>


            <br/> <br/>

            <a href="https://play.google.com/store/apps/details?id=com.provatsoft.alorferi" target="_blank">
                <img src="{{asset('images/defaults/google_play_get_on.png')}}" width="250" alt="Alor Feri logo">
            </a>

            <br/>
            <br/>
        </div>


        <div class="col-sm-4">
            @include("partials.login_welcome")
        </div>

    </div>

    <div>

        <div class="row">
            <div class="col-sm-12 text-center">
                Alor Feri © 2020
            </div>
        </div>

@endsection
