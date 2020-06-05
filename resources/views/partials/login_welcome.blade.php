<div class="panel panel-default">

    {{-- <div class="panel-heading">  Login </div> --}}

    <div class="panel-body">

        <div class="card">
            <form class="form-horizontal" method="POST">
                {{ csrf_field() }}

                <div class="form-group">
                    <div class="col-md-12">
                        &nbsp;
                    </div>
                </div>

                <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                    {{--  <label for="username" class="col-md-4 control-label">Mobile Number</label>  --}}

                    <div class="col-sm-12">
                        <input id="username" type="text" class="form-control" name="username"
                               value="{{ session('username') }}" placeholder="Mobile number or email" required
                               autofocus>

                        @if ($errors->has('username'))
                            <span class="help-block">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                        @endif
                    </div>
                </div>

                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                    {{--  <label for="password" class="col-md-4 control-label">Password</label>  --}}

                    <div class="col-md-12">
                        <input id="password" type="password" class="form-control" name="password" placeholder="Password"
                               required>

                        @if ($errors->has('password'))
                            <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                        @endif
                    </div>
                </div>
                @if ($errors->has('error'))
                    <div class="form-group{{ $errors->has('error') ? ' has-error' : '' }}">
                        <label for="error" class="col-md-4 control-label">&nbsp;</label>

                        <div class="col-md-12">



                                    <span class="help-block">
                                        <strong>{{ $errors->first('error') }}</strong>
                                    </span>

                        </div>
                    </div>
                @endif
                <div class="form-group">
                    <div class="col-md-12 col-md-offset-1">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember
                                Me
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary" style="width:100%">
                            Login
                        </button>

                        <a class="btn btn-link" href="{{ route('password.request') }}">
                            Forgot Your Password?
                        </a>


                    </div>


                </div>

                <div class="form-group">
                    <div class="col">
                    <a href="{{ route('register') }}" class="btn btn-success mx-auto" style="width:100%">
                        Join Now
                    </a>
                    </div>
                </div>


            </form>


        </div>
    </div>
</div>
