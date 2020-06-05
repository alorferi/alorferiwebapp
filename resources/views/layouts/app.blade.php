<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('partials.head')
</head>
<body>
<div id="app">
    @include('partials.guest_nav_bar')

    <main class="py-4">
        @yield('content')
    </main>
</div>
</body>
</html>
