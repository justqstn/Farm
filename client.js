var inf = Timers.GetContext().Get("inf");
var t = Timers.GetContext().Get("t");
Teams.Add("1", "<B>режим от just_qstn</B>", { r: 1 });
Teams.Add("2", "<B>подпишись на ютуб канал just_qstn</B>", { b: 1 });
TeamsBalancer.IsAutoBalance = true;
Teams.OnRequestJoinTeam.Add(function (p, team) {
    team.Add(p);
    p.Spawns.Spawn();
    p.Properties.Kills.Value = 1000;
    p.Properties.Scores.Value = 1000000;
});
inf.RestartLoop(2);
inf.OnTimer.Add(function () {
    if (Players.Count <= 1) return;
    if (!t.IsStarted) t.Restart(60);
    var e = Players.GetEnumerator();
    while (e.moveNext()) {
        if (e.Current.Team == null) {
            if (Teams.Get("1").Count <= Teams.Get("2").Count) Teams.Get("1").Add(e.Current);
            else if (Teams.Get("2").Count <= Teams.Get("1").Count) Teams.Get("2").Add(e.Current);
        }
        e.Current.Properties.Scores.Value += 10000;
        e.Current.Properties.Kills.Value += 100;
    }
    for (let i = 0; i < 200; i++) {
        Game.GameOver(LeaderBoard.GetTeams());
    }
});
t.OnTimer.Add(function () {
    Game.RestartGame();
});
