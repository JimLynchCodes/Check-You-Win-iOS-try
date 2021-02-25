import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { LottieView } from 'nativescript-lottie';
import { registerElement } from '@nativescript/angular';
import { Label, Enums, Application } from "@nativescript/core";


registerElement('LottieView', () => LottieView);

Application.on(Application.exitEvent, (args) => {

    console.log('app closing!')

    if (args.android) {
        console.log('android app closing!')
    }

    else if (args.android) {
        console.log('ios app closing!')
    }
})

Application.on(Application.launchEvent, (args) => {

    console.log('app launch!')

    if (args.android) {
        console.log('android app launch!')
    }

    else if (args.android) {
        console.log('ios app launch!')
    }
})

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ['./items.component.css'],
    moduleId: module.id
})
export class ItemsComponent {

    public loop: boolean = true;
    public src: string;
    public autoPlay: boolean = true;
    public animations: Array<string>;
    private _lottieView: LottieView;

    @ViewChild('win', { read: ElementRef, static: false }) youWinText: ElementRef;
    private youWinTexteLabel: Label;

    constructor() { }

    ngAfterViewInit() {
        console.log('view init...', this.youWinTexteLabel)

        Application.on(Application.suspendEvent, async (args) => {

            // return new Promise( async resolve => {

                console.log('app sus here!')
                console.log('derp')
                console.log(args)
                console.log('k: ' + JSON.stringify(args, null, 2))

                
                await this._lottieView.cancelAnimation();
                
                await this._lottieView.animate({
                    opacity: 0,
                    duration: 100,
                    delay: 0
                    // curve: Enums.AnimationCurve.easeInOut
                })

                await this.youWinText.nativeElement.animate({
                    opacity: 0,
                    duration: 100,
                    delay: 0
                    // curve: Enums.AnimationCurve.easeInOut
                })

                
                if (args.android) {
                    console.log('android app sus!')
                    
                    
                }
                
                else if (args.android) {
                    console.log('ios app sus!')
                }

                setTimeout(() => {
                    // resolve()

                    console.log('timeout fdone')
                }, 3000)
            // })
        })

    }

    lottieViewLoaded(event) {

        console.log('loaded! ')
        console.log({ event })

        this._lottieView = <LottieView>event.object;
        
        this._lottieView.animate({
            duration: 200,
            opacity: 1,
            delay: 20,
            curve: Enums.AnimationCurve.easeInOut
        })

        this._lottieView.completionBlock = (bool) => {
            console.log('completed', bool);
            console.log('you win: ', this.youWinText);
            console.log('label: ', this.youWinTexteLabel)
            
            this.youWinText.nativeElement.animate({
                opacity: 1,
                duration: 700,
                delay: 50,
                curve: Enums.AnimationCurve.easeInOut
            })
                .then(() => {
                    this.youWinText.nativeElement.animate({
                        scale: { x: 1.27, y: 1.27 },
                        delay: 20,
                        duration: 600,
                        curve: Enums.AnimationCurve.easeInOut
                    })
                        .then(() => {
                            this.youWinText.nativeElement.animate({
                                scale: { x: 1, y: 1 },
                                delay: 10,
                                duration: 570,
                                curve: Enums.AnimationCurve.easeInOut
                            })
                            .then(async () => {
                                // await this._lottieView.cancelAnimation();
                
                                // await this._lottieView.animate({
                                //     opacity: 0,
                                //     duration: 100,
                                //     delay: 0
                                //     // curve: Enums.AnimationCurve.easeInOut
                                // })
                
                                // await this.youWinText.nativeElement.animate({
                                //     opacity: 0,
                                //     duration: 100,
                                //     delay: 0
                                //     // curve: Enums.AnimationCurve.easeInOut
                                // })
    
                            })
                        })
                })

        }

        this._lottieView.playAnimation();
    }

}
