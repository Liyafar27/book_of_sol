import 'dart:math';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'src/browser_utils_stub.dart'
    if (dart.library.html) 'src/browser_utils_html.dart';

void main() {
  runApp(const BookOfSolApp());
}

class BookOfSolApp extends StatelessWidget {
  const BookOfSolApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: BookOfSolPage(),
    );
  }
}

class BookOfSolPage extends StatefulWidget {
  const BookOfSolPage({super.key});

  @override
  State<BookOfSolPage> createState() => _BookOfSolPageState();
}

class _BookOfSolPageState extends State<BookOfSolPage>
    with TickerProviderStateMixin {
  int currentPageState = 0; // от 0 до 10
  late AnimationController _controller;
  late Animation<double> _animation;
  bool flipped = false;
  bool isBookVisible = false; // Книга появляется позже
  List<bool> animalsVisible = List.generate(
    15,
    (index) => false,
  ); // Список видимости животных
  late List<Animation<double>> animalAnimations;
  late Future<void> animalAnimationFuture; // Для задержки
  late AnimationController _opacityController;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    // Инициализация анимаций для животных
    animalAnimations = List.generate(15, (i) {
      return Tween<double>(begin: 0, end: 1).animate(
        CurvedAnimation(
          parent: _controller,
          curve: Interval(i * 0.1, (i + 1) * 0.1, curve: Curves.easeInOut),
        ),
      );
    });

    // Задержка для появления книги после того, как все животные анимируются
    animalAnimationFuture = Future.delayed(Duration(seconds: 12), () {
      setState(() {
        isBookVisible = true;
      });
    });
    _opacityController = AnimationController(
      duration: Duration(milliseconds: 900),
      // Устанавливаем длительность анимации
      vsync: this,
    );

    _opacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _opacityController, curve: Curves.easeInOut),
    );
    // Запуск анимации для животных с задержкой
    _controller.forward();
    _startAnimalAnimations();
  }

  // Функция для запуска анимации животных с задержкой
  void _startAnimalAnimations() {
    for (int i = 0; i < 15; i++) {
      Future.delayed(Duration(milliseconds: i * 700), () {
        setState(() {
          animalsVisible[i] = true;
        });
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _opacityController.dispose();

    super.dispose();
  }

  List<Offset> getArcPositions(double screenHeight, double screenWidth) {
    final radius = screenWidth < 800 ? 200.0 : 400.0;
    final center = Offset(screenWidth / 2, screenHeight / 2);

    return List.generate(15, (i) {
      double angle;
      if (i < 7) {
        // Левая половина: от 135° до 225°
        angle = lerpDouble(pi * 1.25, pi * 0.75, i / 6)! + pi / 18;
      } else {
        // Правая половина: от -45° до 45°
        angle = lerpDouble(-pi * 0.25, pi * 0.25, (i - 7) / 7)! - pi / 18;
      }

      return Offset(
        center.dx + radius * cos(angle),
        center.dy + radius * sin(angle),
      );
    });
  }

  void _nextPage() {
    if (currentPageState >= 8) {
      currentPageState = 0; // сброс обратно в начало (закрытая книга)
    } else {
      currentPageState++;
    }
    setState(() {});
  }

  Widget _getBookAsset(double screenWidth) {
    if (currentPageState == 0 || currentPageState >= 9) {
      return Stack(
        children: [
          // Тень (размытая копия изображения)
          Positioned(
            top: 6,
            left: 6,
            child: ImageFiltered(
              imageFilter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
              child: Opacity(
                opacity: 0.4,
                child: Image.asset(
                  'assets/book.png',
                  color: Colors.black, // можно сделать фиолетовой или голубой
                  colorBlendMode: BlendMode.srcIn,
                  width: screenWidth * 0.6,
                ),
              ),
            ),
          ),
          Image.asset('assets/book.png', width: screenWidth * 0.6),
        ],
      );
    } else if (currentPageState >= 1 && currentPageState <= 8) {
      return Transform.scale(
        scale: 1.9,
        child: Stack(
          children: [
            // Тень (размытая копия изображения)
            Positioned(
              top: 6,
              left: 6,
              child: ImageFiltered(
                imageFilter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
                child: Opacity(
                  opacity: 0.4,
                  child: Image.asset(
                    'assets/book_open$currentPageState.png',
                    color: Colors.black, // можно сделать фиолетовой или голубой
                    colorBlendMode: BlendMode.srcIn,
                    width:
                        screenWidth < 800
                            ? screenWidth * 0.4
                            : screenWidth * 0.3,
                  ),
                ),
              ),
            ),
            Image.asset(
              'assets/book_open$currentPageState.png',
              width: screenWidth < 800 ? screenWidth * 0.4 : screenWidth * 0.3,
            ),
          ],
        ),
      );
    } else {
      return Image.asset('assets/book.png', width: screenWidth * 0.6);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final screenWidth = screenSize.width;
    final screenHeight = screenSize.height;
    if (isBookVisible) {
      _opacityController.forward(); // Начать анимацию при видимости
    } else {
      _opacityController.reverse(); // Скрыть при отсутствии видимости
    }

    final arcPositions = getArcPositions(screenHeight, screenWidth);
    return Scaffold(
      backgroundColor: const Color(0xFFEADFFF),
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              'assets/background1.jpeg', // <-- путь к твоей картинке
              fit: BoxFit.cover,
            ),
          ),
          Positioned.fill(
            child: Container(
              // color:  Colors.white7,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.white70, // сверху полупрозрачный белый
                    Colors.transparent, // вниз исчезает
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ),
          if (currentPageState != 0)
            Align(
              alignment: Alignment.topCenter,
              child: Image.asset(
                'assets/title.png',
                width: screenWidth < 800 ? 500.0 : 700,
              ),
            ),
          FlashingAura(),
          if (isBookVisible)
            Align(
              alignment: Alignment.center,

              child: GestureDetector(
                onTap: _nextPage,
                child: AnimatedBuilder(
                  animation: _animation,
                  builder: (context, child) {
                    final angle = _animation.value * pi;
                    // final angle = _animation.value * pi;
                    final isSecondHalf = angle > pi / 2;

                    final displayAngle = isSecondHalf ? pi - angle : angle;

                    return Transform(
                      alignment: Alignment.center,
                      transform:
                          Matrix4.identity()
                            ..setEntry(3, 2, 0.001)
                            ..rotateY(displayAngle),
                      child: FadeTransition(
                        opacity: _opacityAnimation,
                        child: _getBookAsset(screenWidth), // текущая страница
                      ),
                    );
                  },
                ),
              ),
            ),
          if (isBookVisible && currentPageState == 0)
            IgnorePointer(
              ignoring: true,
              child: Align(
                alignment: Alignment.center,
                child: Padding(
                  padding: const EdgeInsets.only(top: 150.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.touch_app, // Иконка книги
                        size: 40.0,
                        color: Colors.white60, // Цвет иконки
                      ),
                      SizedBox(height: 8.0), // Отступ между иконкой и текстом
                      Text(
                        'Click the book', // Текст
                        style: TextStyle(
                          fontSize: 16.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.white70, // Цвет текста
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ...List.generate(15, (i) {
            final arcPos = arcPositions[i];
            final isLeft = i < 7;
            final animalWidth = screenWidth < 800 ? 80.0 : 200.0;

            double calculateTopOffset(
              double dy,
              double screenHeight,
              int currentPageState,
            ) {
              if (currentPageState != 0) {
                if (screenHeight < 600) {
                  return dy + 40;
                } else {
                  return dy - 150;
                }
              } else {
                return dy - 20; // Внесены улучшения в логику
              }
            }

            final horizontalPadding = screenHeight < 800 ? 1.0 : 1.0;
            final dx =
                currentPageState != 0
                    ? (isLeft
                        ? horizontalPadding
                        : screenWidth - horizontalPadding - animalWidth)
                    : arcPos.dx - animalWidth / 2;

            final animalSpacing = screenHeight < 600 ? 30.0 : 100.0;
            final dy =
                currentPageState != 0
                    ? screenHeight * 0.25 +
                        (isLeft ? i : i - 7) * animalSpacing +
                        (screenHeight < 600 ? 20.0 : 1.0)
                    : arcPos.dy - 25;

            return AnimatedPositioned(
              duration: const Duration(milliseconds: 300),
              // Увеличиваем длительность анимации для плавности
              curve: Curves.easeInOut,
              left: dx,
              top: calculateTopOffset(dy, screenHeight, currentPageState),
              child: AnimatedOpacity(
                opacity: animalsVisible[i] ? 1.0 : 0.0,
                // Анимация прозрачности
                duration: const Duration(milliseconds: 300),
                // Увеличили длительность для плавности
                child: AnimatedScale(
                  scale: currentPageState != 0 ? 0.8 : 1.0,
                  // Анимация масштаба
                  duration: const Duration(milliseconds: 300),
                  // Увеличили длительность для плавности
                  child: Image.asset(
                    'assets/pray${i + 1}.png',
                    width: animalWidth,
                  ),
                ),
              ),
            );
          }),
          if (currentPageState != 0)
            Positioned(
              bottom: 110,
              left: 0,
              right: 0,

              child: Center(
                child: Container(
                  alignment: Alignment.topCenter,
                  constraints: BoxConstraints(
                    maxWidth:
                        screenWidth < 600
                            ? screenWidth / 1.1
                            : screenWidth / 1.8,
                  ),
                  height: screenWidth < 600 ? 30 : 50,
                  decoration: BoxDecoration(
                    color: Color(0xFF0088CC).withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white24),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SelectableText(
                        "Dyw2RkHDCAFkkXCYsp13b1h1vvReG1WL8uuWLNXLpump",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize:
                              screenWidth < 600
                                  ? screenWidth / 40
                                  : screenWidth / 60,
                        ),
                      ),
                      Center(
                        child: IconButton(
                          icon: Icon(
                            Icons.copy,
                            color: Colors.white70,
                            size:
                                screenWidth < 600
                                    ? screenWidth / 40
                                    : screenWidth / 60,
                          ),
                          onPressed: () {
                            Clipboard.setData(
                              ClipboardData(
                                text:
                                    'Dyw2RkHDCAFkkXCYsp13b1h1vvReG1WL8uuWLNXLpump',
                              ),
                            );
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text("Copied!")),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          if (isBookVisible)
            Positioned(
              bottom: 10,
              left: 0,
              right: 0, // 👈 это важно: растягивает по ширине родителя
              child: SizedBox(
                width: screenWidth,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildSocialButton(
                      'Telegram',
                      'https://t.me/claponsoltg',
                      const Color(0xFF0088CC),
                      'assets/tg.png',
                      screenWidth,
                    ),
                    SizedBox(width: 8),
                    _buildSocialButton(
                      'X (Twitter)',
                      'https://x.com/claponsolx',
                      const Color(0xFF1DA1F2),
                      'assets/x.png',
                      screenWidth,
                    ),
                    SizedBox(width: 8),

                    _buildSocialButton(
                      'DexScreener',
                      'https://dexscreener.com/solana/zgwc875vgz2rbenzbspuaxlqcng7idfh2bmmusjfmez',
                      const Color(0xFF00FF9D),
                      'assets/dex.png',
                      screenWidth,
                    ),
                    SizedBox(width: 8),

                    _buildSocialButton(
                      'DexScreener',
                      'https://dexscreener.com/solana/zgwc875vgz2rbenzbspuaxlqcng7idfh2bmmusjfmez',
                      const Color(0xFFECE091),
                      'assets/pump.png',
                      screenWidth,
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

Widget _buildSocialButton(
  String label,
  String url,
  Color color,
  String icon,
  screenWidth,
) {
  return MouseRegion(
    cursor: SystemMouseCursors.click,
    child: InkWell(
      onTap: () {
        openUrl(url);
      },
      child: Container(
        width: screenWidth < 800 ? screenWidth / 9 : screenWidth / 15,

        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFFECE091).withValues(alpha: 0.8),
              Color(0xFFECE091),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Color(0xFFFF69B4).withValues(alpha: 0.4),
              blurRadius: 20,
              spreadRadius: 2,
              offset: const Offset(0, 8),
            ),
          ],
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
        child: Image.asset(icon, fit: BoxFit.cover),
      ),
    ),
  );
}

class PulsingLight extends StatefulWidget {
  const PulsingLight({super.key});

  @override
  State<PulsingLight> createState() => _PulsingLightState();
}

class _PulsingLightState extends State<PulsingLight>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _scaleAnimation = Tween<double>(
      begin: 0.8,
      end: 1.5,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    _opacityAnimation = Tween<double>(
      begin: 0.2,
      end: 0.8,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (_, __) {
        return Center(
          child: Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.purpleAccent.withValues(alpha:_opacityAnimation.value),
                boxShadow: [
                  BoxShadow(
                    color: Colors.purpleAccent.withValues(alpha:
                      _opacityAnimation.value,
                    ),
                    blurRadius: 80,
                    spreadRadius: 20,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class FlashingAura extends StatefulWidget {
  const FlashingAura({super.key});

  @override
  State<FlashingAura> createState() => _FlashingAuraState();
}

class _FlashingAuraState extends State<FlashingAura>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _radiusAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: false);

    _radiusAnimation = Tween<double>(
      begin: 0.0,
      end: 600.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));

    _opacityAnimation = Tween<double>(
      begin: 0.6,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: _controller,
        builder: (_, __) {
          return Container(
            width: _radiusAnimation.value,
            height: _radiusAnimation.value,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  Colors.indigoAccent.withValues(alpha:_opacityAnimation.value),

                  Colors.white70.withValues(alpha:_opacityAnimation.value * 0.4),
                  Colors.yellowAccent.withValues(alpha:
                    _opacityAnimation.value * 0.5,
                  ),
                ],
                stops: const [0.0, 0.3, 1.0],
              ),
            ),
          );
        },
      ),
    );
  }
}
